# Multi-Provider AI Chatbot Configuration

The chatbot now supports **multiple AI providers with automatic fallback**! If one provider fails (API key issues, rate limits, etc.), it automatically tries the next one.

## Provider Order (Fallback Chain)
1. **Gemini** (Primary) - Free tier available, recommended
2. **OpenAI** (Fallback) - Requires paid account
3. **Anthropic Claude** (Secondary Fallback) - Requires paid account

## Configuration

Add one or more API keys to `backend/.env`:

### Option 1: Gemini (Recommended - Free Tier)
```env
GEMINI_API_KEY=your-gemini-key-here
MODEL_NAME=gemini-2.0-flash-exp
```
- Get your key: https://aistudio.google.com/app/apikey
- Free tier: Yes (generous limits)

### Option 2: OpenAI (Fallback)
```env
OPENAI_API_KEY=your-openai-key-here
```
- Get your key: https://platform.openai.com/api-keys
- Free tier: No (requires payment method)

### Option 3: Anthropic Claude (Secondary Fallback)
```env
ANTHROPIC_API_KEY=your-anthropic-key-here
```
- Get your key: https://console.anthropic.com/
- Free tier: Limited trial credits

## How It Works

When a user sends a message:
1. Try Gemini first (if configured)
2. If Gemini fails → Try OpenAI (if configured)
3. If OpenAI fails → Try Anthropic (if configured)
4. The first successful response is returned to the user

The response includes which provider was used, so you can monitor which keys are working.

## Installation

After adding API keys to `.env`:

```bash
# Install new dependency (anthropic)
cd backend
pip install -r requirements.txt

# Restart backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Benefits

✅ **High Availability**: Chatbot keeps working even if one provider is down
✅ **No Downtime**: Automatic failover means users always get responses  
✅ **Cost Optimization**: Use free Gemini tier first, paid providers as backup
✅ **Flexibility**: Can use any combination of providers

## Troubleshooting

**Problem**: All providers failing with "leaked key" error
- **Solution**: Generate fresh API keys for all configured providers

**Problem**: Rate limit errors
- **Solution**: Add more providers to spread the load

**Problem**: "No AI providers configured" message
- **Solution**: Add at least one valid API key to `backend/.env`
