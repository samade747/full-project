from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os, requests, json
from dotenv import load_dotenv
load_dotenv()

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
QDRANT_URL = os.environ.get("QDRANT_URL")
QDRANT_API_KEY = os.environ.get("QDRANT_API_KEY")
QDRANT_COLLECTION = os.environ.get("QDRANT_COLLECTION","calcu_book")

if not OPENAI_API_KEY:
    raise RuntimeError("Set OPENAI_API_KEY in environment or .env")

app = FastAPI(title="Calcu Backend")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.post("/api/chatkit/session")
async def create_chatkit_session():
    body = {"user": "anonymous_user", "session": {"metadata": {"source": "calcu_book"}}}
    headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json", "OpenAI-Beta": "chatkit_beta=v1"}
    resp = requests.post("https://api.openai.com/v1/chatkit/sessions", headers=headers, json=body, timeout=30)
    if resp.status_code not in (200,201):
        raise HTTPException(status_code=500, detail=f"ChatKit session creation failed: {resp.text}")
    data = resp.json()
    return {"client_secret": data.get("client_secret"), "raw": data}

@app.post("/query")
async def query_endpoint(req: Request):
    body = await req.json()
    query = body.get("query")
    selection = body.get("selection")
    if not query:
        raise HTTPException(status_code=400, detail="Provide 'query' in JSON body")
    if selection:
        prompt = [
            {"role":"system","content":"You must answer using only the provided selection. If info not present, reply 'INSUFFICIENT_SELECTION'."},
            {"role":"user","content": f"Selection:\\n{selection}\\n\\nQuestion: {query}"}
        ]
        resp = requests.post("https://api.openai.com/v1/chat/completions", headers={"Authorization":f"Bearer {OPENAI_API_KEY}","Content-Type":"application/json"}, json={"model":"gpt-4o","messages": prompt, "max_tokens":512})
        if resp.status_code!=200:
            raise HTTPException(status_code=500, detail=resp.text)
        return resp.json()
    else:
        emb = requests.post("https://api.openai.com/v1/embeddings", headers={"Authorization":f"Bearer {OPENAI_API_KEY}","Content-Type":"application/json"}, json={"model":"text-embedding-3-small","input":query})
        if emb.status_code!=200:
            raise HTTPException(status_code=500, detail="Embedding failed")
        qvec = emb.json()["data"][0]["embedding"]
        qdrant_url = f"{QDRANT_URL.rstrip('/')}/collections/{QDRANT_COLLECTION}/points/search"
        qres = requests.post(qdrant_url, headers={"api-key":QDRANT_API_KEY,"Content-Type":"application/json"}, json={"vector": qvec, "limit":5}, timeout=30)
        if qres.status_code!=200:
            raise HTTPException(status_code=500, detail="Qdrant search failed: "+qres.text)
        hits = qres.json().get("result") or qres.json().get("hits") or qres.json()
        passages = []
        for h in hits:
            if isinstance(h, dict) and h.get("payload") and h["payload"].get("text"):
                passages.append(h["payload"]["text"])
            elif isinstance(h, dict) and h.get("payload") and isinstance(h["payload"], dict):
                # fallback: dump payload
                passages.append(str(h["payload"]))
        context = "\\n\\n---\\n\\n".join(passages)
        prompt = [
            {"role":"system","content":"Answer using only the provided context passages."},
            {"role":"user","content": f"Context:\\n{context}\\n\\nQuestion: {query}"}
        ]
        resp = requests.post("https://api.openai.com/v1/chat/completions", headers={"Authorization":f"Bearer {OPENAI_API_KEY}","Content-Type":"application/json"}, json={"model":"gpt-4o","messages": prompt, "max_tokens":512})
        if resp.status_code!=200:
            raise HTTPException(status_code=500, detail=resp.text)
        return resp.json()
