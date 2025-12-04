# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv(override=True)

# ===== FASTAPI APPLICATION =====
app = FastAPI(
    title="FastAPI Backend with AI Support",
    description="Backend for authentication, user management, and AI chatbot",
    version="1.0.0"
)

# CORS configuration - Allow specific origins (no wildcard with credentials)
allowed_origins = [
    "https://full-project-kappa.vercel.app",
    "https://full-project.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=86400,  # Cache preflight for 24 hours
)

# ===== STARTUP EVENT =====
@app.on_event("startup")
async def startup_event():
    from app.database.db import init_db
    # init_db()
    print("Database initialized successfully! (Skipped)")

# ===== ROUTES =====
@app.get("/")
def read_root():
    return {
        "message": "FastAPI backend is running!",
        "features": ["Authentication", "User Management", "AI Chatbot via /api/query"]
    }

# ===== INCLUDE API ROUTERS =====
from app.api import auth
from app.api import chat

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api", tags=["chat"])