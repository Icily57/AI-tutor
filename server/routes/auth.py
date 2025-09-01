from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_db

router = APIRouter()

@router.post("/login")
async def login(username: str, password: str, db: AsyncSession = Depends(get_db)):
    # TODO: Replace with real user model + hashed password
    if username == "demo" and password == "password":
        return {"token": "fake-jwt-token", "user": {"id": 1, "name": "Demo User"}}
    return {"error": "Invalid credentials"}
