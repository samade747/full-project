print("Script starting...")
import os
import sys
from dotenv import load_dotenv

# Add backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

# Load environment variables
load_dotenv(override=True)
print("Env loaded.")

print("Importing search_qdrant_rag...")
try:
    from app.api.chat import search_qdrant_rag
    print("Import successful.")
except Exception as e:
    print(f"Import failed: {e}")
    sys.exit(1)

def test_rag():
    print("Testing RAG Connection...")
    
    qdrant_url = os.getenv("QDRANT_URL")
    openai_key = os.getenv("OPENAI_API_KEY")
    
    print(f"QDRANT_URL configured: {bool(qdrant_url)}")
    print(f"OPENAI_API_KEY configured: {bool(openai_key)}")
    
    if not qdrant_url or not openai_key:
        print("❌ Missing required environment variables.")
        return
    
    query = "What is ROS 2?"
    print(f"\nRunning search for: '{query}'")
    
    try:
        result = search_qdrant_rag(query)
        if result:
            print("\n✅ RAG Search Successful!")
            print(f"Result length: {len(result)} chars")
            print("Preview:")
            print(result[:200] + "...")
        else:
            print("\n⚠️ RAG Search returned no results (but no error).")
    except Exception as e:
        print(f"\n❌ RAG Search Failed with error: {e}")

if __name__ == "__main__":
    test_rag()
