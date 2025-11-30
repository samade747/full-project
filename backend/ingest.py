# Simple ingestion script: read markdown files under ../book/docs, chunk them, embed and upsert to Qdrant
import os, glob, json, math
from dotenv import load_dotenv
load_dotenv()
import openai
from qdrant_client import QdrantClient

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
QDRANT_URL = os.getenv('QDRANT_URL')
QDRANT_API_KEY = os.getenv('QDRANT_API_KEY')
COLLECTION = os.getenv('QDRANT_COLLECTION_NAME', 'calcu_book')
CHUNK_SIZE = int(os.getenv('CHUNK_SIZE', '800'))

if not OPENAI_API_KEY:
    raise RuntimeError('OPENAI_API_KEY is required in environment')

openai.api_key = OPENAI_API_KEY
client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY, prefer_grpc=False)

def chunk_text(text, chunk_size=800, overlap=100):
    tokens = []
    start = 0
    L = len(text)
    while start < L:
        end = min(start + chunk_size, L)
        tokens.append(text[start:end])
        start = max(0, end - overlap)
        if end == L:
            break
    return tokens

def embed_texts(texts):
    response = openai.Embedding.create(input=texts, model='text-embedding-3-small')
    vectors = [d['embedding'] for d in response['data']]
    return vectors

def upsert_chunks(chunks, vectors, namespace=COLLECTION):
    points = []
    for i,(c,v) in enumerate(zip(chunks,vectors)):
        points.append({
            "id": f"chunk-{i}",
            "vector": v,
            "payload": {"text": c}
        })
    # create collection if missing (best-effort)
    try:
        client.recreate_collection(collection_name=namespace, vectors_config={"size": len(vectors[0]), "distance": "Cosine"})
    except Exception:
        pass
    client.upsert(collection_name=namespace, points=points)

def ingest_docs(docs_path='../book/docs'):
    md_files = glob.glob(os.path.join(docs_path, '**', '*.md'), recursive=True)
    all_chunks = []
    for f in md_files:
        with open(f, 'r', encoding='utf-8') as fh:
            text = fh.read()
        chunks = chunk_text(text, CHUNK_SIZE)
        all_chunks.extend(chunks)
    # embed in batches
    BATCH = 16
    vectors = []
    for i in range(0, len(all_chunks), BATCH):
        batch = all_chunks[i:i+BATCH]
        vectors.extend(embed_texts(batch))
    upsert_chunks(all_chunks, vectors)

if __name__ == '__main__':
    print('Starting ingest...')
    ingest_docs()
    print('Done.')