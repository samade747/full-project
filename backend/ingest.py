import os, glob, requests, time
from dotenv import load_dotenv
load_dotenv()
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
QDRANT_URL = os.environ.get("QDRANT_URL")
QDRANT_API_KEY = os.environ.get("QDRANT_API_KEY")
QDRANT_COLLECTION = os.environ.get("QDRANT_COLLECTION","calcu_book")

DOCS_PATH = os.path.join(os.path.dirname(__file__), "..", "book", "docs", "**", "*.md")

def read_docs():
    import glob, os
    files = glob.glob(DOCS_PATH, recursive=True)
    docs = []
    for p in files:
        with open(p, "r", encoding="utf-8") as f:
            docs.append({"path": p, "text": f.read()})
    return docs

def chunk_text(text, size=3000):
    return [text[i:i+size] for i in range(0, len(text), size)]

def get_embedding(text):
    resp = requests.post("https://api.openai.com/v1/embeddings", headers={"Authorization":f"Bearer {OPENAI_API_KEY}"}, json={"model":"text-embedding-3-small","input":text})
    resp.raise_for_status()
    return resp.json()["data"][0]["embedding"]

def upsert(points):
    url = f"{QDRANT_URL.rstrip('/')}/collections/{QDRANT_COLLECTION}/points?wait=true"
    resp = requests.put(url, headers={"api-key":QDRANT_API_KEY,"Content-Type":"application/json"}, json={"points": points})
    resp.raise_for_status()
    return resp.json()

def main():
    docs = read_docs()
    pts = []
    cid = 1
    for d in docs:
        chunks = chunk_text(d["text"])
        for c in chunks:
            emb = get_embedding(c)
            pts.append({"id": str(cid), "vector": emb, "payload": {"path": d["path"], "text": c}})
            cid += 1
            if len(pts) >= 64:
                upsert(pts); pts = []; time.sleep(0.2)
    if pts: upsert(pts)
    print("done")

if __name__ == '__main__': main()
