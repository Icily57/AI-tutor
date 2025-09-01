from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_db
from services.gemini import generate_quiz

router = APIRouter()

class QuizRequest(BaseModel):
    topic: str
    level: str = "beginner"


@router.post("/generate")
async def generate_quiz_endpoint(
    request: QuizRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        quiz = await generate_quiz(request.topic, request.level)
        return {"topic": request.topic, "level": request.level, "quiz": quiz}
    except Exception as e:
        # Return the error message to frontend
        raise HTTPException(status_code=500, detail=f"Failed to generate quiz: {str(e)}")
