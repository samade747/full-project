# app/api/chat.py
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
import os
import requests
import google.generativeai as genai
from typing import Optional

router = APIRouter()

# API Keys Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
DASHSCOPE_API_KEY = os.getenv("DASHSCOPE_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "gemini-2.0-flash-exp")

# Qdrant Configuration for RAG
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION_NAME", "sddhackathon4")

# Configure Gemini
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)


def search_qdrant_rag(query: str, top_k: int = 4) -> str:
    """
    Semantic search in Qdrant using OpenAI embeddings.
    Returns formatted context from the book's knowledge base.
    """
    if not QDRANT_URL or not OPENAI_API_KEY:
        print("⚠️ RAG disabled: QDRANT_URL or OPENAI_API_KEY not configured")
        return None
    
    try:
        import openai
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        
        # Step 1: Generate embedding for the query
        embedding_response = client.embeddings.create(
            model="text-embedding-3-small",
            input=query
        )
        query_vector = embedding_response.data[0].embedding
        print(f"✅ Generated query embedding (dim: {len(query_vector)})")
        
        # Step 2: Search Qdrant
        headers = {
            "Content-Type": "application/json"
        }
        if QDRANT_API_KEY:
            headers["api-key"] = QDRANT_API_KEY
        
        search_response = requests.post(
            f"{QDRANT_URL}/collections/{QDRANT_COLLECTION}/points/search",
            headers=headers,
            json={
                "vector": query_vector,
                "limit": top_k,
                "with_payload": True,
                "with_vector": False
            },
            timeout=10
        )
        
        if search_response.status_code != 200:
            print(f"❌ Qdrant search failed: {search_response.text}")
            return None
        
        data = search_response.json()
        results = data.get('result', [])
        
        if not results:
            print("⚠️ No results found in knowledge base")
            return None
        
        # Filter by similarity score (>30%)
        good_results = [r for r in results if r.get('score', 0) > 0.3]
        
        if not good_results:
            print("⚠️ No results with sufficient similarity")
            return None
        
        print(f"✅ Found {len(good_results)} relevant results (best score: {good_results[0].get('score', 0):.2%})")
        
        # Format context
        context_parts = []
        for i, res in enumerate(good_results, 1):
            payload = res.get('payload', {})
            text = payload.get('text', '')
            source = payload.get('source', 'Unknown')
            if text:
                context_parts.append(f"[Source: {source}]\n{text}")
        
        return "\n\n---\n\n".join(context_parts)
        
    except Exception as e:
        print(f"❌ RAG search error: {str(e)}")
        return None

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
    Tries providers in order: Gemini → OpenAI → Anthropic → Groq → Qwen → OpenRouter
    """
    query = body.query
    selected_text = body.selected_text
    
    # Provider configuration
    providers = []
    
    # 1. Google Gemini (primary - free tier available)
    if GEMINI_API_KEY and GEMINI_API_KEY != "your-gemini-api-key-here":
        providers.append(("Gemini", "gemini"))
    
    # 2. OpenAI (fallback 1)
    if OPENAI_API_KEY and not OPENAI_API_KEY.startswith("your-") and not OPENAI_API_KEY.startswith("sk-proj-your"):
        providers.append(("OpenAI", "openai"))
    
    # 3. Anthropic Claude (fallback 2)
    if ANTHROPIC_API_KEY and not ANTHROPIC_API_KEY.startswith("your-"):
        providers.append(("Anthropic", "anthropic"))
    
    # 4. Groq (fallback 3 - fast inference, free tier)
    if GROQ_API_KEY and not GROQ_API_KEY.startswith("your-"):
        providers.append(("Groq", "groq"))
    
    # 5. Qwen via DashScope (fallback 4)
    if DASHSCOPE_API_KEY and not DASHSCOPE_API_KEY.startswith("your-"):
        providers.append(("Qwen", "qwen"))
    
    # 6. OpenRouter (fallback 5 - multi-model aggregator)
    if OPENROUTER_API_KEY and not OPENROUTER_API_KEY.startswith("your-"):
        providers.append(("OpenRouter", "openrouter"))
    
    # If no providers configured
    if not providers:
        return {
            "choices": [{
                "message": {
                    "content": f"⚙️ **No AI providers configured.**\\n\\nTo enable the chatbot, add at least one API key to `backend/.env`:\\n\\n**Option 1: Gemini (Free Tier)**\\n- Get key: https://aistudio.google.com/app/apikey\\n\\n**Option 2: OpenAI**\\n- Get key: https://platform.openai.com/api-keys\\n\\n**Option 3: Anthropic Claude**\\n- Get key: https://console.anthropic.com/\\n\\n**Option 4: Groq (Free Tier)**\\n- Get key: https://console.groq.com/keys\\n\\n**Option 5: Qwen (DashScope)**\\n- Get key: https://dashscope.console.aliyun.com/\\n\\n**Option 6: OpenRouter (Free Models)**\\n- Get key: https://openrouter.ai/keys\\n\\nThen restart the backend server."
                }
            }]
        }
    
    # Build the prompt with RAG
    context = None
    rag_used = False
    
    if selected_text:
        # User provided selected text - use it as context
        context = selected_text
        print(f"📝 Using user-provided selected text ({len(selected_text)} chars)")
    else:
        # No selected text - search knowledge base (RAG)
        print(f"🔍 Searching knowledge base for: {query[:50]}...")
        context = search_qdrant_rag(query, top_k=body.top_k or 4)
        if context:
            rag_used = True
            print(f"✅ RAG context retrieved ({len(context)} chars)")
    
    if context:
        prompt = f"""You are an AI assistant specialized in Physical AI and Humanoid Robotics.

Answer the following question based ONLY on the provided context from the book. Be accurate and cite specific concepts from the context.

Context from Knowledge Base:
{context}

Question: {query}

Answer (based on the context above):"""
    else:
        # No context available - general response
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
            
            elif provider_type == "groq":
                # Groq - Fast inference with free tier
                from groq import Groq
                client = Groq(api_key=GROQ_API_KEY)
                response = client.chat.completions.create(
                    model="llama-3.1-8b-instant",
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=500
                )
                ai_content = response.choices[0].message.content
            
            elif provider_type == "qwen":
                # Qwen via DashScope (OpenAI-compatible API)
                import openai
                client = openai.OpenAI(
                    api_key=DASHSCOPE_API_KEY,
                    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
                )
                response = client.chat.completions.create(
                    model="qwen-turbo",
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=500
                )
                ai_content = response.choices[0].message.content
            
            elif provider_type == "openrouter":
                # OpenRouter - Multi-model aggregator (OpenAI-compatible API)
                import openai
                client = openai.OpenAI(
                    api_key=OPENROUTER_API_KEY,
                    base_url="https://openrouter.ai/api/v1",
                    default_headers={
                        "HTTP-Referer": "https://physical-ai-book.pages.dev",
                        "X-Title": "Physical AI Chatbot"
                    }
                )
                response = client.chat.completions.create(
                    model="meta-llama/llama-3.1-8b-instruct:free",
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=500
                )
                ai_content = response.choices[0].message.content
            
            # Success! Return response with provider info
            return {
                "choices": [{
                    "message": {
                        "content": ai_content,
                        "provider": provider_name,
                        "rag_used": rag_used
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


# ===== BONUS FEATURE: PERSONALIZATION ENDPOINT =====

class PersonalizeRequest(BaseModel):
    content: str
    preferences: dict  # {level, languages, aiExperience, hardwareKnowledge}

@router.post("/personalize")
async def personalize_content(body: PersonalizeRequest):
    """Personalize chapter content based on user's background/preferences."""
    content = body.content
    prefs = body.preferences
    
    level = prefs.get("level", "intermediate")
    languages = prefs.get("languages", [])
    ai_exp = prefs.get("aiExperience", "basic")
    hw_knowledge = prefs.get("hardwareKnowledge", "basic")
    
    lang_str = ", ".join(languages) if languages else "general programming"
    
    prompt = f"""You are a technical content adapter. Rewrite the following content to match the reader's skill level and background.

**Reader Profile:**
- Programming Level: {level}
- Known Languages: {lang_str}
- AI/ML Experience: {ai_exp}
- Hardware Knowledge: {hw_knowledge}

**Adaptation Guidelines:**
- For BEGINNER: Use simpler language, more analogies, explain every technical term
- For INTERMEDIATE: Balance explanation with technical depth
- For ADVANCED: Be concise, focus on advanced concepts, skip basics

If the reader knows specific languages (like Python), use code examples in those languages when relevant.

**Original Content:**
{content}

**Personalized Content (maintain markdown formatting):**"""

    # Use first available provider
    try:
        if GEMINI_API_KEY and GEMINI_API_KEY != "your-gemini-api-key-here":
            model = genai.GenerativeModel(MODEL_NAME)
            response = model.generate_content(prompt)
            return {"content": response.text, "level": level}
        elif OPENAI_API_KEY:
            import openai
            client = openai.OpenAI(api_key=OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=2000
            )
            return {"content": response.choices[0].message.content, "level": level}
        elif GROQ_API_KEY:
            from groq import Groq
            client = Groq(api_key=GROQ_API_KEY)
            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=2000
            )
            return {"content": response.choices[0].message.content, "level": level}
        else:
            return {"error": "No AI provider configured", "content": content}
    except Exception as e:
        print(f"Personalization error: {e}")
        return {"error": str(e), "content": content}


# ===== BONUS FEATURE: URDU TRANSLATION ENDPOINT =====

class TranslateRequest(BaseModel):
    content: str
    target_language: str = "ur"  # Default to Urdu

@router.post("/translate")
async def translate_content(body: TranslateRequest):
    """Translate chapter content to Urdu (or other language)."""
    content = body.content
    target = body.target_language
    
    lang_names = {"ur": "Urdu", "hi": "Hindi", "ar": "Arabic"}
    lang_name = lang_names.get(target, target)
    
    prompt = f"""Translate the following technical content to {lang_name}. 

**Translation Guidelines:**
1. Maintain all technical terms in English (like ROS, API, Python, etc.) - just transliterate or keep as-is
2. Preserve all markdown formatting (headers, code blocks, lists, etc.)
3. Keep code examples in English - only translate explanatory text
4. Make it natural and readable in {lang_name}
5. For Urdu: Use proper Urdu script, maintain RTL compatibility

**Original Content (English):**
{content}

**Translated Content ({lang_name}):**"""

    try:
        if GEMINI_API_KEY and GEMINI_API_KEY != "your-gemini-api-key-here":
            model = genai.GenerativeModel(MODEL_NAME)
            response = model.generate_content(prompt)
            return {"content": response.text, "language": target, "direction": "rtl" if target in ["ur", "ar"] else "ltr"}
        elif OPENAI_API_KEY:
            import openai
            client = openai.OpenAI(api_key=OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=2000
            )
            return {"content": response.choices[0].message.content, "language": target, "direction": "rtl" if target in ["ur", "ar"] else "ltr"}
        elif GROQ_API_KEY:
            from groq import Groq
            client = Groq(api_key=GROQ_API_KEY)
            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=2000
            )
            return {"content": response.choices[0].message.content, "language": target, "direction": "rtl" if target in ["ur", "ar"] else "ltr"}
        else:
            return {"error": "No AI provider configured", "content": content}
    except Exception as e:
        print(f"Translation error: {e}")
        return {"error": str(e), "content": content}
