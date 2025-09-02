AI Tutor: A Full-Stack AI-Powered Learning Platform
Welcome to the AI Tutor repository! This project is a full-stack web application designed to be a personal study companion for students. It leverages the power of Artificial Intelligence to generate dynamic, personalized educational content in real-time.

The application is built with a decoupled architecture, consisting of a React-based frontend and a Python FastAPI backend.

Key Features
AI-Powered Lesson Generation: Users can request lessons on any subject, and the AI will dynamically create a structured, beginner-friendly lesson plan.

AI-Powered Quiz Generation: The platform generates interactive, multiple-choice quizzes on requested topics to help users test their knowledge.

Personalized Learning: The system is designed to provide tailored content based on user input, making the learning experience more engaging.

Secure Payments: Integration with the IntaSend API handles secure payment checkouts for subscription management.

Responsive Design: The frontend is built with Tailwind CSS to ensure a seamless experience on all devices, from mobile phones to desktops.

Technical Stack
Frontend
Framework: React

Styling: Tailwind CSS

Routing: React Router DOM

API Client: axios

Backend
Language: Python

Web Framework: FastAPI

AI Integration: Google Gemini API

Payment Processing: IntaSend API

Database ORM: SQLAlchemy with Asyncio support

HTTP Client: httpx

Getting Started
To get the full-stack application up and running locally, follow these steps.

Prerequisites
Ensure you have the following installed:

Node.js and npm

Python 3.8+ and pip

A database (e.g., PostgreSQL)

Your API keys for Gemini and IntaSend

1. Backend Setup
First, set up and run the backend server. The frontend relies on this API.

Clone the repository:

git clone [https://github.com/your-username/ai-tutor.git](https://github.com/your-username/ai-tutor.git)
cd ai-tutor/backend

Create a virtual environment and install dependencies:

python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt

Configure environment variables:
Create a .env file in the backend directory with your credentials.

# Google Gemini API Key
GEMINI_API_KEY="your_gemini_api_key"

# SQLAlchemy Database URL (e.g., for PostgreSQL)
DATABASE_URL="postgresql+asyncpg://user:password@host:5432/dbname"

# IntaSend API Credentials
INTASEND_SECRET_KEY="your_intasend_secret_key"
INTASEND_ENV="sandbox"

# URL of your frontend application
APP_URL="http://localhost:5173"

Run the backend server:

uvicorn main:app --reload

The API should now be running at http://127.0.0.1:8000. You can test the endpoints and view the documentation at http://127.0.0.1:8000/docs.

2. Frontend Setup
Next, get the React frontend running.

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Run the frontend application:

npm run dev

The application will be accessible at http://localhost:5173. It will automatically connect to your running backend.

Contribution
We welcome contributions! If you have suggestions, feature requests, or bug fixes, please feel free to open a pull request or an issue on the repository.