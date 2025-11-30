# Calcu Project (fixed)

This repository contains a minimal Docusaurus frontend (book) and a FastAPI backend that supports:
- ChatKit session creation (/api/chatkit/session)
- RAG queries against Qdrant using OpenAI embeddings (/api/query)
- Ingest script to read markdown docs and index into Qdrant (backend/ingest.py)

Quick start:
1. Copy backend/.env.example -> backend/.env and fill keys.
2. Start Qdrant (cloud or local) and set QDRANT_URL & QDRANT_API_KEY.
3. Backend:
   python -m venv .venv
   .venv\Scripts\activate  (Windows) or source .venv/bin/activate (mac/linux)
   pip install -r backend/requirements.txt
   uvicorn backend.app:app --reload --port 8000
4. Ingest book docs:
   python backend/ingest.py
5. Frontend (book):
   cd book
   npm install
   npm start
