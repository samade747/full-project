# backend/main.py

from __future__ import annotations

import asyncio
import logging
from datetime import datetime
from typing import Any, AsyncIterator

from fastapi import Depends, FastAPI, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, StreamingResponse, PlainTextResponse
from starlette.responses import JSONResponse
from dotenv import load_dotenv

from agents import RunConfig, Runner
from agents.model_settings import ModelSettings
from chatkit.agents import AgentContext, stream_agent_response
from chatkit.server import ChatKitServer, StreamingResult
from chatkit.types import (
    Action,
    AssistantMessageContent,
    AssistantMessageItem,
    Attachment,
    HiddenContextItem,
    ThreadItemDoneEvent,
    ThreadItemUpdated,
    ThreadMetadata,
    ThreadStreamEvent,
    UserMessageItem,
    WidgetItem,
    WidgetRootUpdated,
)
from openai.types.responses import (
    EasyInputMessageParam,
    ResponseInputContentParam,
    ResponseInputTextParam,
)
from pydantic import ValidationError

from src.database.db import init_db
from .memory_store import MemoryStore
from .support_agent import support_agent
from .thread_item_converter import CustomerSupportThreadItemConverter

load_dotenv()

DEFAULT_THREAD_ID = "demo_default_thread"
logger = logging.getLogger(__name__)


# ===== CHATKIT CUSTOMER SUPPORT SERVER =====
class CustomerSupportServer(ChatKitServer[dict[str, Any]]):
    def __init__(self) -> None:
        store = MemoryStore()
        super().__init__(store)
        self.store = store
        self.agent = support_agent
        self.thread_item_converter = CustomerSupportThreadItemConverter()

    async def action(
        self,
        thread: ThreadMetadata,
        action: Action[str, Any],
        sender: WidgetItem | None,
        context: dict[str, Any],
    ) -> AsyncIterator[ThreadStreamEvent]:
        hidden = HiddenContextItem(
            id=self.store.generate_item_id("message", thread, context),
            thread_id=thread.id,
            created_at=datetime.now(),
            content=f"<WIDGET_ACTION widgetId={sender.id}>{action.type} was performed with payload: {action.payload}</WIDGET_ACTION>",
        )
        await self.store.add_thread_item(thread.id, hidden, context)

    async def respond(
        self,
        thread: ThreadMetadata,
        input_user_message: UserMessageItem | None,
        context: dict[str, Any],
    ) -> AsyncIterator[ThreadStreamEvent]:
        # Load all items from the thread to send as agent input
        items_page = await self.store.load_thread_items(thread.id, None, 20, "desc", context)
        items = list(reversed(items_page.data))

        # Prepend customer profile as part of the agent input
        input_items = await self.thread_item_converter.to_agent_input(items)

        agent_context = AgentContext(
            thread=thread,
            store=self.store,
            request_context=context,
        )
        result = Runner.run_streamed(
            self.agent,
            input_items,
            context=agent_context,
            run_config=RunConfig(model_settings=ModelSettings(temperature=0.4)),
        )

        async for event in stream_agent_response(agent_context, result):
            yield event

    async def to_message_content(self, _input: Attachment) -> ResponseInputContentParam:
        raise RuntimeError("File attachments are not supported in this demo.")


support_server = CustomerSupportServer()


# ===== FASTAPI APPLICATION =====
app = FastAPI(
    title="FastAPI Backend with ChatKit Support",
    description="Backend for authentication, user management, and AI customer support",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ===== STARTUP EVENT =====
@app.on_event("startup")
async def startup_event():
    init_db()
    print("Database tables created/verified!")
    print("ChatKit Customer Support Server initialized!")


# ===== DEPENDENCY INJECTION =====
def get_server() -> CustomerSupportServer:
    return support_server


# ===== ROUTES =====
@app.get("/")
def read_root():
    return {
        "message": "FastAPI backend is running!",
        "features": ["Authentication", "User Management", "ChatKit AI Support"]
    }


@app.post("/support/chatkit")
async def chatkit_endpoint(
    request: Request, 
    server: CustomerSupportServer = Depends(get_server)
) -> Response:
    """ChatKit customer support endpoint"""
    payload = await request.body()
    result = await server.process(payload, {"request": request})
    
    if isinstance(result, StreamingResult):
        return StreamingResponse(result, media_type="text/event-stream")
    if hasattr(result, "json"):
        return Response(content=result.json, media_type="application/json")
    return JSONResponse(result)


# ===== INCLUDE API ROUTERS =====
from src.api import auth
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])