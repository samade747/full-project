print("Starting imports...")
try:
    print("Importing fastapi...")
    from fastapi import APIRouter
    print("Importing pydantic...")
    from pydantic import BaseModel
    print("Importing requests...")
    import requests
    print("Importing google.generativeai...")
    import google.generativeai as genai
    print("All imports successful.")
except Exception as e:
    print(f"Import failed: {e}")
