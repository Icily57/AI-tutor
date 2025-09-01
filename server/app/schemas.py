from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict


# ---------- AUTH ----------

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    refresh_token: Optional[str] = None  # optional but useful for longer sessions


class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None


class UserCreate(UserBase):
    password: str  # will be hashed before saving


class UserLogin(BaseModel):
    email: EmailStr
    password: str  # plain text password for login


class UserOut(UserBase):
    id: int
    plan: str

    class Config:
        from_attributes = True


# ---------- QUIZZES ----------

class QuizQuestion(BaseModel):
    id: str
    prompt: str
    choices: List[str]
    answer_index: int
    explanation: Optional[str] = None


class QuizPayload(BaseModel):
    lesson_slug: Optional[str]
    level: str = Field(pattern="^(beginner|intermediate|advanced)$")
    count: int = 5


class QuizResult(BaseModel):
    questions: List[QuizQuestion]


class SubmitAnswers(BaseModel):
    attempt_id: Optional[int]
    answers: Dict[str, int]  # {question_id: selected_index}


# ---------- PAYMENTS ----------

class CheckoutRequest(BaseModel):
    mode: str  # "subscription" | "course"
    course_slug: Optional[str] = None


class CheckoutResponse(BaseModel):
    checkout_url: str
