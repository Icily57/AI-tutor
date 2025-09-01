from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_db
from services.learning import next_lesson_for_user  # ✅ fixed import

router = APIRouter()

@router.get("/next/{user_id}")
async def get_next_lesson(user_id: int, db: AsyncSession = Depends(get_db)):
    lesson = await next_lesson_for_user(db, user_id)
    return {"next_lesson": lesson}
