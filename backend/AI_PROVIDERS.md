# Multi-Provider AI Chatbot Configuration

The chatbot supports **6 AI providers with automatic fallback**! If one provider fails (API key issues, rate limits, etc.), it automatically tries the next one.

## Provider Order (Fallback Chain)

| Order | Provider | Model | Free Tier |
|-------|----------|-------|-----------|
| 1 | **Gemini** (Primary) | gemini-2.0-flash-exp | ✅ Yes |
| 2 | **OpenAI** | gpt-3.5-turbo | ❌ No |
| 3 | **Anthropic Claude** | claude-3-haiku | ❌ No |
| 4 | **Groq** | llama-3.1-8b-instant | ✅ Yes |
| 5 | **Qwen** (DashScope) | qwen-turbo | ✅ Limited |
| 6 | **OpenRouter** | llama-3.1-8b-instruct | ✅ Yes (free models) |

## Quick Setup

Add API keys to `backend/.env`:

```env
# Pick at least one (more = better reliability)
GEMINI_API_KEY=your-key-here
GROQ_API_KEY=your-key-here
OPENROUTER_API_KEY=your-key-here
```

---

## Provider Details

### Option 1: Gemini (Recommended - Free Tier)
```env
GEMINI_API_KEY=your-gemini-key-here
MODEL_NAME=gemini-2.0-flash-exp
```
- **Get your key**: https://aistudio.google.com/app/apikey
- **Free tier**: ✅ Yes (generous limits)
- **Best for**: Primary provider, reliable and fast

---

### Option 2: OpenAI
```env
OPENAI_API_KEY=your-openai-key-here
```
- **Get your key**: https://platform.openai.com/api-keys
- **Free tier**: ❌ No (requires payment method)
- **Best for**: High-quality responses

---

### Option 3: Anthropic Claude
```env
ANTHROPIC_API_KEY=your-anthropic-key-here
```
- **Get your key**: https://console.anthropic.com/
- **Free tier**: ❌ No (limited trial credits)
- **Best for**: Long-form, nuanced responses

---

### Option 4: Groq (Free, Very Fast)
```env
GROQ_API_KEY=your-groq-key-here
```
- **Get your key**: https://console.groq.com/keys
- **Free tier**: ✅ Yes (generous limits)
- **Best for**: Ultra-fast inference, great backup

---

### Option 5: Qwen via DashScope
```env
DASHSCOPE_API_KEY=your-dashscope-key-here
```
- **Get your key**: https://dashscope.console.aliyun.com/
- **Free tier**: ✅ Limited trial credits
- **Best for**: Chinese language support, diverse models

---

### Option 6: OpenRouter
```env
OPENROUTER_API_KEY=your-openrouter-key-here
```
- **Get your key**: https://openrouter.ai/keys
- **Free tier**: ✅ Yes (many free models available)
- **Best for**: Access to 100+ models, ultimate fallback

---

## How It Works

When a user sends a message:
1. Try Gemini first (if configured)
2. If Gemini fails → Try OpenAI (if configured)
3. If OpenAI fails → Try Anthropic (if configured)
4. If Anthropic fails → Try Groq (if configured)
5. If Groq fails → Try Qwen (if configured)
6. If Qwen fails → Try OpenRouter (if configured)
7. The first successful response is returned to the user

The response includes which provider was used for monitoring.

---

## Installation

After adding API keys to `.env`:

```bash
# Install dependencies (including new groq package)
cd backend
pip install -r requirements.txt

# Restart backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## Benefits

✅ **High Availability**: Chatbot keeps working even if multiple providers are down  
✅ **No Downtime**: Automatic failover means users always get responses  
✅ **Cost Optimization**: Use free tiers first (Gemini, Groq, OpenRouter)  
✅ **Flexibility**: Any combination of 1-6 providers  
✅ **Fast Fallback**: Groq provides ultra-fast responses as backup  

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| All providers failing with "leaked key" error | Generate fresh API keys for all providers |
| Rate limit errors | Add more providers to spread the load |
| "No AI providers configured" message | Add at least one valid API key to `backend/.env` |
| Slow responses | Add Groq as fallback (fastest inference) |
| Want more model variety | Add OpenRouter (100+ models available) |

---

## Environment Template

Copy this to your `backend/.env`:

```env
# AI Provider API Keys (add at least one)

# Gemini (Primary - Free)
GEMINI_API_KEY=
MODEL_NAME=gemini-2.0-flash-exp

# OpenAI (Fallback 1 - Paid)
OPENAI_API_KEY=

# Anthropic (Fallback 2 - Paid)
ANTHROPIC_API_KEY=

# Groq (Fallback 3 - Free)
GROQ_API_KEY=

# Qwen/DashScope (Fallback 4)
DASHSCOPE_API_KEY=

# OpenRouter (Fallback 5 - Free models)
OPENROUTER_API_KEY=
```
