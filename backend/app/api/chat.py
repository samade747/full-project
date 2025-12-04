# app/api/chat.py
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
import os
import google.generativeai as genai
from typing import Optional

router = APIRouter()

# API Keys Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "gemini-2.0-flash-exp")

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
    return {"session": "AI_SESSION", "expires_in": 3600}

@router.post("/query")
async def query_endpoint(body: QueryRequest):
    """Chat query endpoint with multi-provider fallback.
    Tries providers in order: Gemini → OpenAI → Anthropic
    """
    query = body.query
    selected_text = body.selected_text
    
    # Provider configuration
    providers = []
    
    # 1. Google Gemini (primary - free tier available)
    if GEMINI_API_KEY and GEMINI_API_KEY != "your-gemini-api-key-here":
        providers.append(("Gemini", "gemini"))
    
    # 2. OpenAI (fallback)
    if OPENAI_API_KEY and not OPENAI_API_KEY.startswith("your-") and not OPENAI_API_KEY.startswith("sk-proj-your"):
        providers.append(("OpenAI", "openai"))
    
    # 3. Anthropic Claude (secondary fallback)
    if ANTHROPIC_API_KEY and not ANTHROPIC_API_KEY.startswith("your-"):
        providers.append(("Anthropic", "anthropic"))
    
    # If no providers configured
    if not providers:
        return {
            "choices": [{
                "message": {
                    "content": f"⚙️ **No AI providers configured.**\\n\\nTo enable the chatbot, add at least one API key to `backend/.env`:\\n\\n**Option 1: Gemini (Free Tier Available)**\\n1. Get key from https://aistudio.google.com/app/apikey\\n2. Add: `GEMINI_API_KEY=your-key`\\n\\n**Option 2: OpenAI**\\n1. Get key from https://platform.openai.com/api-keys\\n2. Add: `OPENAI_API_KEY=your-key`\\n\\n**Option 3: Anthropic Claude**\\n1. Get key from https://console.anthropic.com/\\n2. Add: `ANTHROPIC_API_KEY=your-key`\\n\\nThen restart the backend server."
                }
            }]
        }
    
    # Build the prompt
    if selected_text:
        prompt = f"""You are an AI assistant specialized in Physical AI and Humanoid Robotics.

Answer the following question based ONLY on the provided text context. Do not use external knowledge.

Context:
{selected_text}

Question: {query}

Answer:"""
    else:
        prompt = f"""You are an AI assistant specialized in Physical AI and Humanoid Robotics. You help users understand concepts related to robotics, artificial intelligence, autonomous systems, humanoid robots, and related technologies.

Be helpful, concise, and technically accurate. If you don't know something, say so.

Question: {query}

Answer:"""
    
    # Try each provider in order
    for provider_name, provider_type in providers:
        try:
            if provider_type == "gemini":
                # Google Gemini
                model = genai.GenerativeModel(MODEL_NAME)
                response = model.generate_content(prompt)
                ai_content = response.text if hasattr(response, 'text') else "I couldn't generate a response."
                
            elif provider_type == "openai":
                # OpenAI
                import openai
                client = openai.OpenAI(api_key=OPENAI_API_KEY)
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=500
                )
                ai_content = response.choices[0].message.content
                
            elif provider_type == "anthropic":
                # Anthropic Claude
                import anthropic
                client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
                response = client.messages.create(
                    model="claude-3-haiku-20240307",
                    max_tokens=500,
                    messages=[{"role": "user", "content": prompt}]
                )
                ai_content = response.content[0].text
            
            # Success! Return response with provider info
            return {
                "choices": [{
                    "message": {
                        "content": ai_content,
                        "provider": provider_name
                    }
                }]
            }
            
        except Exception as e:
            error_msg = str(e)
            
            # If this is the last provider, return detailed error
            if provider_name == providers[-1][0]:
                # Handle specific error types
                if "quota" in error_msg.lower() or "429" in error_msg or "rate" in error_msg.lower():
                    return {
                        "choices": [{
                            "message": {
                                "content": f"⚠️ **All AI providers are rate-limited.**\\n\\nProviders tried: {', '.join([p[0] for p in providers])}\\n\\nPlease try again in a moment or add another provider's API key to `backend/.env`"
                            }
                        }]
                    }
                elif "api_key" in error_msg.lower() or "401" in error_msg or "403" in error_msg or "leaked" in error_msg.lower() or "invalid" in error_msg.lower():
                    return {
                        "choices": [{
                            "message": {
                                "content": f"🔑 **All configured API keys have issues.**\\n\\nLast error from {provider_name}: `{error_msg[:100]}`\\n\\n**Please:**\\n1. Check your API keys in `backend/.env`\\n2. Generate fresh keys if needed\\n3. Ensure keys are active and valid\\n\\n**Providers tried:** {', '.join([p[0] for p in providers])}"
                            }
                        }]
                    }
                else:
                    return {
                        "choices": [{
                            "message": {
                                "content": f"❌ **All AI providers failed.**\\n\\nLast error from {provider_name}: `{error_msg[:150]}`\\n\\nProviders tried: {', '.join([p[0] for p in providers])}\\n\\nPlease check your API keys and network connection."
                            }
                        }]
                    }
            
            # Otherwise, log and continue to the next provider
            print(f"Provider {provider_name} failed: {error_msg}. Trying next provider...")
            continue
