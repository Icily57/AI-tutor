AI Tutor: Full-Stack Learning Platform
Welcome to the AI Tutor repository, a comprehensive AI-powered learning platform. This project is a full-stack application designed to provide personalized educational content and assessments to students.

Deployed Application
You can view the live application and its API at the following links:

Frontend: https://ai-tutor-frontend-ten.vercel.app

Backend API: https://ai-tutor-api-1-ryrc.onrender.com/

Features
Personalized Lessons: Generates beginner-friendly lessons on any subject using the Google Gemini API.

Adaptive Quizzes: Creates dynamic multiple-choice quizzes to test and reinforce knowledge.

Secure Payments: Integrates with IntaSend for a secure payment checkout experience.

Progress Tracking: Monitors user progress and learning history.

Responsive Design: A clean, modern UI that works across all devices.

Technical Stack
Frontend
Framework: React

Styling: Tailwind CSS

Routing: React Router DOM

API Client: Axios

Backend
Framework: Python FastAPI

AI: Google Gemini API

Database: PostgreSQL (with SQLAlchemy)

Payments: IntaSend API

Dependency Management: Pipenv

Getting Started
Prerequisites
Before you begin, ensure you have the following installed:

Node.js & npm (for the frontend)

Python 3.8+ & pipenv (for the backend)

PostgreSQL (for the database)

1. Clone the repository
git clone [https://github.com/your-username/ai-tutor.git](https://github.com/your-username/ai-tutor.git)
cd ai-tutor

2. Set up the Backend
cd backend
# Create a .env file and add your keys
cp .env.example .env

# Install dependencies and run the server
pipenv install
pipenv run start

3. Set up the Frontend
cd frontend
# Install dependencies and run the development server
npm install
npm run dev

The frontend will be available at http://localhost:5173 and will automatically connect to your local backend server running on port 8000.