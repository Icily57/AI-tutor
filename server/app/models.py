from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .db import Base


class User(Base):
	__tablename__ = "users"
	id = Column(Integer, primary_key=True, index=True)
	email = Column(String, unique=True, index=True, nullable=False)
	hashed_password = Column(String, nullable=False)
	name = Column(String, nullable=True)
	is_active = Column(Boolean, default=True)
	plan = Column(String, default="free") # free | premium
	created_at = Column(DateTime(timezone=True), server_default=func.now())

	progress = relationship("Progress", back_populates="user")
	attempts = relationship("QuizAttempt", back_populates="user")


class Lesson(Base):
	__tablename__ = "lessons"
	id = Column(Integer, primary_key=True)
	slug = Column(String, unique=True, index=True)
	title = Column(String)
	content = Column(Text) # markdown/html
	level = Column(String) # beginner/intermediate/advanced

class Progress(Base):
	__tablename__ = "progress"
	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey("users.id"))
	lesson_id = Column(Integer, ForeignKey("lessons.id"))
	score = Column(Float, default=0.0)
	status = Column(String, default="started") # started/completed
	updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

	user = relationship("User", back_populates="progress")
	lesson = relationship("Lesson")

class QuizAttempt(Base):
	__tablename__ = "quiz_attempts"
	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey("users.id"))
	lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=True)
	payload = Column(Text) # JSON string of questions
	answers = Column(Text) # JSON string of answers
	score = Column(Float, default=0.0)
	created_at = Column(DateTime(timezone=True), server_default=func.now())

	user = relationship("User", back_populates="attempts")