# backend/main.py - patched
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Import app package routers (existing app folder)
from app.api.auth import router as auth_router
from app.api.chat import router as chat_router

app = FastAPI(title="Calcu Backend", version="1.0.0")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    # initialize DB if available
    try:
        from app.database.db import init_db
        init_db()
        print("Database initialized")
    except Exception as e:
        print("DB init skipped or failed:", e)

@app.get("/")
def root():
    return {"message": "Calcu backend up"}

if auth_router is not None:
    app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
if chat_router is not None:
    app.include_router(chat_router, prefix="/api", tags=["chat"])
