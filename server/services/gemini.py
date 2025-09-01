import os
import httpx
import json
import re
from dotenv import load_dotenv

load_dotenv()  # ✅ loads GEMINI_API_KEY from .env

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-1.5-flash"  # can adjust to gemini-1.5-pro if needed

BASE_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"


async def generate_quiz(topic: str, level: str = "beginner", num_questions: int = 5) -> dict:
    """
    Use Gemini to generate a quiz for a given topic and level.
    Returns structured JSON with questions and answers.
    """
    if not GEMINI_API_KEY:
        raise ValueError("❌ Missing GEMINI_API_KEY. Please set it in your .env file.")

    prompt = f"""
    Create a {level} level quiz on the topic: "{topic}".
    The quiz should have {num_questions} multiple-choice questions.
    Each question must include exactly 4 options and 1 correct answer.
    
    Format the output as pure JSON (no extra text, no explanations) with this structure:
    {{
      "questions": [
        {{
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "answer": "string"
        }}
      ]
    }}
    """

    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(
            BASE_URL,
            headers={"Authorization": f"Bearer {GEMINI_API_KEY}"},
            json={"contents": [{"parts": [{"text": prompt}]}]},
        )

        if response.status_code != 200:
            raise RuntimeError(f"Gemini API error {response.status_code}: {response.text}")

        data = response.json()

        # Extract text from Gemini response
        try:
            text_output = data["candidates"][0]["content"]["parts"][0]["text"]
        except (KeyError, IndexError):
            raise RuntimeError("❌ Unexpected Gemini API response format")

        # Clean markdown-style ```json fences if present
        text_output = re.sub(r"^```(json)?|```$", "", text_output.strip(), flags=re.MULTILINE)

        # Parse JSON safely
        try:
            quiz = json.loads(text_output)
        except json.JSONDecodeError:
            quiz = {"raw_output": text_output}  # fallback if Gemini output isn't valid JSON

        return quiz
