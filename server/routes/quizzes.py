from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_db
from services.gemini import generate_quiz  # ✅ import service

router = APIRouter(prefix="/quizzes", tags=["quizzes"])


@router.post("/generate")
async def generate_quiz_endpoint(
    topic: str,
    level: str = "beginner",
    db: AsyncSession = Depends(get_db)
):
    """
    Generate a quiz for a given topic and difficulty level.
    Uses Gemini service to create adaptive content.
    """
    try:
        quiz = await generate_quiz(topic, level)
        return {"topic": topic, "level": level, "quiz": quiz}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate quiz: {str(e)}")
