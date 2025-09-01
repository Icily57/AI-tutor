import os
import httpx
import json
import re
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-1.5-flash"
BASE_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"


async def generate_quiz(topic: str, level: str = "beginner", num_questions: int = 5) -> dict:
    if not GEMINI_API_KEY:
        raise ValueError("❌ Missing GEMINI_API_KEY. Please set it in your .env file.")

    prompt = f"""
    Create a {level} level quiz on the topic: "{topic}".
    The quiz should have {num_questions} multiple-choice questions.
    Each question must include exactly 4 options and 1 correct answer.

    Format the output as pure JSON with this structure:
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

    try:
        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(
                f"{BASE_URL}?key={GEMINI_API_KEY}",
                headers={"Content-Type": "application/json"},
                json={"contents": [{"parts": [{"text": prompt}]}]},
            )

            print("🔍 Gemini HTTP status:", response.status_code)
            print("🔍 Gemini raw response:", response.text)

            if response.status_code != 200:
                return {"error": f"Gemini API error {response.status_code}", "details": response.text}

            data = response.json()

            # Extract text safely
            try:
                text_output = data["candidates"][0]["content"]["parts"][0]["text"]
            except Exception as e:
                print("❌ Failed extracting text:", e)
                return {"error": "Unexpected Gemini API response format", "details": data}

            # Clean and parse JSON
            text_output = re.sub(r"^```(json)?|```$", "", text_output.strip(), flags=re.MULTILINE)

            try:
                quiz = json.loads(text_output)
            except json.JSONDecodeError as e:
                print("⚠️ JSON parse failed:", e)
                return {"raw_output": text_output, "error": "Invalid JSON format from Gemini"}

            return quiz

    except Exception as e:
        print("💥 Fatal error in generate_quiz:", str(e))
        return {"error": str(e)}
