import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def next_lesson_for_user(db, user_id: int, subject: str):
    """
    Uses Gemini API to generate the next lesson for the given subject.
    """
    model = genai.GenerativeModel("gemini-1.5-flash")  # fast + cheap
    prompt = f"""
    You are an AI tutor. Create a short structured beginner-friendly lesson on {subject}.
    Include:
    - Lesson title
    - Level (e.g., Beginner/Intermediate/Advanced)
    - Content (in a short paragraph)
    """

    response = model.generate_content(prompt)

    # Safety: Handle if Gemini returns nothing
    if not response or not response.candidates:
        return {
            "title": f"Lesson in {subject}",
            "level": "Beginner",
            "content": "Sorry, I couldn't generate a lesson right now."
        }

    text = response.text

    # Basic structuring (for demo — later we can use JSON formatting)
    return {
        "title": f"Introduction to {subject}",
        "level": "Beginner",
        "content": text
    }
