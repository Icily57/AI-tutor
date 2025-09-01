from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, lessons, quizzes, payments

app = FastAPI(title="AI Tutor with Gemini + IntaSend")

# CORS for frontend (React at :5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(lessons.router, prefix="/lessons", tags=["lessons"])
app.include_router(quizzes.router, prefix="/quizzes", tags=["quizzes"])
app.include_router(payments.router, prefix="/payments", tags=["payments"])


@app.get("/")
async def root():
    return {"message": "Welcome to AI Tutor API"}
