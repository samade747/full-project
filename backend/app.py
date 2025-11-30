from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
import os, requests, json
from dotenv import load_dotenv
load_dotenv()

# Optional: use openai lib for embeddings & completions
import openai
from qdrant_client import QdrantClient

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
CHATKIT_WORKFLOW_ID = os.getenv("CHATKIT_WORKFLOW_ID", "")
MODEL_NAME = os.getenv("MODEL_NAME", "gpt-4o-mini")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION_NAME", "calcu_book")

if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY missing in env")

openai.api_key = OPENAI_API_KEY

qdrant_client = None
if QDRANT_URL:
    qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY, prefer_grpc=False)

app = FastAPI(title="Calcu Backend RAG Chatbot")

class QueryRequest(BaseModel):
    query: str
    selected_text: str = None
    mode: str = "rag"  # "selection" or "rag"

@app.post("/api/chatkit/session")
async def create_chatkit_session(request: Request):
    """Create a ChatKit session by calling OpenAI ChatKit Sessions API and return client_secret to frontend.
    Requires CHATKIT_WORKFLOW_ID env var set to your deployed ChatKit Workflow/Agent ID.
    """
    if not CHATKIT_WORKFLOW_ID:
        raise HTTPException(status_code=400, detail="CHATKIT_WORKFLOW_ID not set on server")

    # Build request to OpenAI ChatKit Sessions endpoint
    url = "https://api.openai.com/v1/chatkit/sessions"
    payload = {
        "workflow": CHATKIT_WORKFLOW_ID,
        # optionally include user metadata
        "user": {"id": "user-1"}
    }
    headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
    resp = requests.post(url, json=payload, headers=headers, timeout=15)
    if resp.status_code != 200 and resp.status_code != 201:
        raise HTTPException(status_code=502, detail=f"OpenAI ChatKit session error: {resp.text}")
    return resp.json()

def get_embedding(text: str):
    # Use OpenAI embeddings API
    resp = openai.Embedding.create(input=[text], model="text-embedding-3-small")
    return resp["data"][0]["embedding"]

def search_qdrant(query_embedding, top_k=4):
    if not qdrant_client:
        return []
    hits = qdrant_client.search(
        collection_name=QDRANT_COLLECTION,
        query_vector=query_embedding,
        limit=top_k,
        with_payload=True
    )
    # Convert to simple list dicts
    results = []
    for h in hits:
        payload = h.payload or {}
        results.append({
            "id": h.id,
            "score": h.score,
            "payload": payload
        })
    return results

@app.post("/api/query")
async def query(q: QueryRequest):
    # selection-only mode
    if q.mode == "selection" and q.selected_text:
        prompt = f"""Answer the question using ONLY the following text. If the answer is not contained in the text, reply: 'I don't know based on the provided selection.'\n\n=== SELECTION ===\n{q.selected_text}\n\n=== QUESTION ===\n{q.query}\n\nAnswer:"""
        completion = openai.ChatCompletion.create(
            model=MODEL_NAME,
            messages=[{"role":"system","content":"You are an assistant that answers ONLY from provided context."},
                      {"role":"user","content":prompt}],
            max_tokens=512,
            temperature=0.0
        )
        return {"answer": completion["choices"][0]["message"]["content"].strip()}

    # RAG flow
    # 1) embed query
    query_embedding = get_embedding(q.query)
    # 2) search qdrant
    docs = search_qdrant(query_embedding, top_k=6)
    # build context from top docs
    context_texts = []
    for d in docs:
        payload = d.get("payload", {})
        text = payload.get("text") or payload.get("content") or ""
        context_texts.append(text)
    context = "\n\n---\n\n".join(context_texts) if context_texts else ""

    prompt = f"""Use the following context passages from the book to answer the question. If you cannot find the answer, say you don't know.\n\nContext:\n{context}\n\nQuestion: {q.query}\nAnswer:"""

    completion = openai.ChatCompletion.create(
        model=MODEL_NAME,
        messages=[{"role":"system","content":"You are a helpful assistant that answers using ONLY the provided context when available."},
                  {"role":"user","content":prompt}],
        max_tokens=512,
        temperature=0.0
    )
    return {"answer": completion["choices"][0]["message"]["content"].strip(), "sources": [d.get("payload") for d in docs]}
