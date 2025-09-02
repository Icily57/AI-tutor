AI Tutor Backend
This is the backend repository for the AI Tutor web application, a dynamic learning platform that leverages AI to create personalized educational content. This backend serves as the core engine, handling all logic related to AI content generation, user interactions, and payment processing.

Features
AI-Powered Lesson Generation: Uses the Google Gemini API to dynamically create structured, beginner-friendly lessons on various subjects.

AI-Powered Quiz Generation: Generates multiple-choice quizzes on any given topic to help users practice and test their knowledge.

Payment Processing: Integrates with the IntaSend API to handle payment checkouts and subscription management.

API Endpoints: Provides a robust set of RESTful API endpoints for the frontend, including routes for lessons, quizzes, and payments.

Database Integration: Utilizes SQLAlchemy to connect with a database for data persistence.

Technical Stack
Language: Python

Web Framework: FastAPI

API Integration: Google Gemini API, IntaSend API

Database ORM: SQLAlchemy with Asyncio support

HTTP Client: httpx

Environment Management: python-dotenv

Getting Started
To run this backend project locally, follow these steps:

Clone the repository and navigate to the project directory:

git clone [https://github.com/your-username/ai-tutor-backend.git](https://github.com/your-username/ai-tutor-backend.git)
cd ai-tutor-backend

Install the dependencies:
It is recommended to use a virtual environment.

pip install -r requirements.txt

If you don't have a requirements.txt file, you can manually install the required libraries:
fastapi, uvicorn, python-dotenv, httpx, google-generativeai, pydantic, SQLAlchemy, asyncpg.

Configure environment variables:
Create a .env file in the root directory and add the following variables. Replace the placeholder values with your actual keys and URLs.

# Gemini API Key
GEMINI_API_KEY="your_gemini_api_key_here"

# Database URL for SQLAlchemy
# Example for PostgreSQL: postgresql+asyncpg://user:password@host:5432/dbname
DATABASE_URL="your_database_url_here"

# IntaSend API credentials
INTASEND_SECRET_KEY="your_intasend_secret_key_here"
INTASEND_ENV="sandbox" # or "live" for production

# URL of your frontend application
APP_URL="http://localhost:5173"

Run the server:

uvicorn main:app --reload

The API should now be running at http://127.0.0.1:8000. You can access the interactive API documentation at http://127.0.0.1:8000/docs.

Contribution
Contributions are welcome! If you have suggestions for new features, bug fixes, or improvements, please feel free to open a pull request.