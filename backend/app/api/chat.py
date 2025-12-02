# app/api/chat.py
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
import os
import google.generativeai as genai
from typing import Optional

router = APIRouter()

# Google Gemini Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "gemini-2.5-flash")

# Configure Gemini
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

class QueryRequest(BaseModel):
    query: str
    selected_text: Optional[str] = None
    top_k: Optional[int] = 4

@router.post("/chatkit/session")
async def chatkit_session():
    """Return a session placeholder for frontend Chat widget."""
    return {"session": "GEMINI_SESSION", "expires_in": 3600}

@router.post("/query")
async def query_endpoint(body: QueryRequest):
    """Chat query endpoint using Google Gemini AI.
    If `selected_text` is provided, answers must be derived only from it.
    Otherwise, answers general questions about Physical AI & Humanoid Robotics.
    """
    # Check if Gemini API key is configured
    if not GEMINI_API_KEY or GEMINI_API_KEY == "your-gemini-api-key-here":
        return {
            "choices": [{
                "message": {
                    "content": f"I received your question: '{body.query}'\n\n⚙️ The Gemini API key is not configured. To get AI-powered responses, please:\n1. Get a free API key from https://aistudio.google.com/app/apikey\n2. Add it to backend/.env as GEMINI_API_KEY\n3. Restart the backend server\n\n💡 Gemini has a generous free tier perfect for development!"
                }
            }]
        }
    
    try:
        # Initialize Gemini model
        model = genai.GenerativeModel(MODEL_NAME)
        
        # Build the prompt
        if body.selected_text:
            prompt = f"""You are an AI assistant specialized in Physical AI and Humanoid Robotics.

Answer the following question based ONLY on the provided text context. Do not use external knowledge.

Context:
{body.selected_text}

Question: {body.query}

Answer:"""
        else:
            prompt = f"""You are an AI assistant specialized in Physical AI and Humanoid Robotics. You help users understand concepts related to robotics, artificial intelligence, autonomous systems, humanoid robots, and related technologies.

Be helpful, concise, and technically accurate. If you don't know something, say so.

Question: {body.query}

Answer:"""
        
        # Generate response
        response = model.generate_content(prompt)
        
        # Extract the text from Gemini's response
        ai_content = response.text if hasattr(response, 'text') else "I couldn't generate a response."
        
        # Return in OpenAI-compatible format for frontend compatibility
        return {
            "choices": [{
                "message": {
                    "content": ai_content
                }
            }]
        }
        
    except Exception as e:
        error_msg = str(e)
        
        # Handle specific Gemini API errors
        if "quota" in error_msg.lower() or "429" in error_msg:
            return {
                "choices": [{
                    "message": {
                        "content": f"⚠️ API quota exceeded. Please try again in a moment.\n\nYour question: '{body.query}'\n\nError: {error_msg}"
                    }
                }]
            }
        elif "api_key" in error_msg.lower() or "401" in error_msg or "403" in error_msg:
            return {
                "choices": [{
                    "message": {
                        "content": f"🔑 API key issue detected.\n\nPlease check:\n1. Is your Gemini API key correct in backend/.env?\n2. Is the key active at https://aistudio.google.com/app/apikey?\n\nError: {error_msg}"
                    }
                }]
            }
        else:
            # Generic error handling
            return {
                "choices": [{
                    "message": {
                        "content": f"❌ An error occurred while processing your request.\n\nQuestion: '{body.query}'\n\nError: {error_msg}\n\nPlease try again or contact support if the issue persists."
                    }
                }]
            }
