import os
import httpx
from dotenv import load_dotenv

load_dotenv()  # ✅ loads GEMINI_API_KEY from .env

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-1.5-flash"  # you can adjust to another model

BASE_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"


async def generate_quiz(topic: str, level: str = "beginner") -> dict:
    """
    Use Gemini to generate a quiz for a given topic and level.
    Returns a dict with questions and answers.
    """
    if not GEMINI_API_KEY:
        raise ValueError("❌ Missing GEMINI_API_KEY. Please set it in your .env file.")

    prompt = f"""
    Create a {level} level quiz on the topic: {topic}.
    Format the output as JSON with this structure:
    {{
      "questions": [
        {{
          "question": "...",
          "options": ["...", "...", "...", "..."],
          "answer": "..."
        }}
      ]
    }}
    """

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(
            BASE_URL,
            headers={"Authorization": f"Bearer {GEMINI_API_KEY}"},
            json={"contents": [{"parts": [{"text": prompt}]}]},
        )

        if response.status_code != 200:
            raise RuntimeError(
                f"Gemini API error {response.status_code}: {response.text}"
            )

        data = response.json()

        # Extract model response
        try:
            text_output = data["candidates"][0]["content"]["parts"][0]["text"]
        except (KeyError, IndexError):
            raise RuntimeError("❌ Unexpected Gemini API response format")

        # Try parsing Gemini's output as JSON
        import json
        try:
            quiz = json.loads(text_output)
        except json.JSONDecodeError:
            # If Gemini returns plain text instead of valid JSON
            quiz = {"raw_output": text_output}

        return quiz
