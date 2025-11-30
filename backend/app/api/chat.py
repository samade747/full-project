# app/api/chat.py
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
import os
import requests
from typing import Optional

router = APIRouter()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION_NAME", "calcu_book")
MODEL_NAME = os.getenv("MODEL_NAME", "gpt-4o-mini")

class QueryRequest(BaseModel):
    query: str
    selected_text: Optional[str] = None
    top_k: Optional[int] = 4

@router.post("/chatkit/session")
async def chatkit_session():
    """Return a short-lived session token for frontend Chat widget.
    This implementation attempts to call OpenAI ChatKit Sessions API if configured.
    Otherwise it returns a simple placeholder session object.
    """
    if not OPENAI_API_KEY:
        # Return placeholder (frontend can still call /api/query directly)
        return {"session": "LOCAL_SESSION", "expires_in": 3600}
    # Example: call OpenAI session-creation endpoint (pseudo)
    try:
        headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
        # Replace with the real ChatKit Sessions URL when available
        resp = requests.post("https://api.openai.com/v1/chat/sessions", headers=headers, json={})
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        return {"session": "LOCAL_SESSION", "error": str(e)}

@router.post("/query")
async def query_endpoint(body: QueryRequest):
    """RAG query endpoint. If `selected_text` is provided, answers must be derived only from it.
    Otherwise, does a vector search against Qdrant and asks the LLM.
    """
    # If selected_text provided, use that as the only context
    if body.selected_text:
        prompt = f"Answer based ONLY on the following text:\n\n{body.selected_text}\n\nQuestion: {body.query}\nAnswer:"
        # Call LLM via OpenAI completion
        if not OPENAI_API_KEY:
            raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")
        from requests import post
        headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
        payload = {"model": MODEL_NAME, "messages": [{"role":"user","content": prompt}]}
        resp = post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        resp.raise_for_status()
        return resp.json()

    # Otherwise, perform vector search in Qdrant
    if not QDRANT_URL:
        raise HTTPException(status_code=500, detail="QDRANT_URL not configured")
    # compute embedding for query
    try:
        from openai import OpenAI
        client = OpenAI(api_key=OPENAI_API_KEY)
        emb_resp = client.embeddings.create(model="text-embedding-3-small", input=body.query)
        query_vector = emb_resp.data[0].embedding
    except Exception as e:
        # fallback: call REST embedding
        import requests
        headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
        r = requests.post("https://api.openai.com/v1/embeddings", headers=headers, json={"model":"text-embedding-3-small","input": body.query})
        r.raise_for_status()
        query_vector = r.json()["data"][0]["embedding"]

    # Query Qdrant
    try:
        qdrant_search_url = QDRANT_URL.rstrip('/') + f"/collections/{QDRANT_COLLECTION}/points/search"
        headers = {"api-key": QDRANT_API_KEY, "Content-Type": "application/json"} if QDRANT_API_KEY else {"Content-Type": "application/json"}
        payload = {"vector": query_vector, "top": body.top_k}
        r = requests.post(qdrant_search_url, headers=headers, json=payload)
        r.raise_for_status()
        hits = r.json().get("result") or r.json().get("hits") or r.json()
        # assemble context
        contexts = []
        for h in hits[: body.top_k]:
            # Qdrant may return payload or payload['payload'] depending on version
            txt = h.get('payload') or h.get('payload', {})
            if isinstance(txt, dict):
                txt = txt.get('text') or str(txt)
            contexts.append(str(txt))
        context_text = "\n\n".join(contexts)
        prompt = f"Use the following context to answer the question:\n\n{context_text}\n\nQuestion: {body.query}\nAnswer:"
        headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
        payload = {"model": MODEL_NAME, "messages": [{"role":"user","content": prompt}]}
        resp = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
