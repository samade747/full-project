# Calcu — AI Spec-Driven Book + RAG Chatbot
This repository is a production-ready scaffold for the hackathon project:
- Frontend: Docusaurus book (book/) with embedded ChatKit widget (Chat UI)
- Backend: FastAPI service (backend/) providing:
  - ChatKit session endpoint for secure client tokens
  - Ingestion endpoint to index Docusaurus docs into Qdrant
  - Query endpoint to run RAG (Qdrant -> LLM)
- Vector store: Qdrant Cloud (recommended) or Neon Postgres with pgvector (optional)
See README in backend/ for details.
