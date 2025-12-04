# Physical AI Book - Subagents

This directory contains Claude Code subagent prompts that provide reusable AI intelligence
for the Physical AI book project. These subagents can be used by Claude Code, Gemini, or
other AI assistants to perform specialized tasks.

## Available Subagents

### Content Subagents
1. **chapter-personalize-agent** - Personalizes chapter content based on user's skill level
2. **urdu-translate-agent** - Translates technical content to Urdu with proper RTL formatting
3. **rag-search-agent** - Searches the book's knowledge base using semantic search

### Development Subagents
4. **docusaurus-chapter-agent** - Creates and modifies Docusaurus documentation chapters
5. **api-development-agent** - Develops FastAPI endpoints for the backend

## Usage with Claude Code

To use a subagent, reference the prompt file:
```
@subagents/chapter-personalize-agent.md
```

## Integration

These subagents are integrated with:
- The chatbot's personalization feature (`/api/personalize`)
- The chatbot's translation feature (`/api/translate`)
- The RAG search functionality (`/api/query`)
