AI Tutor: Backend
Welcome to the backend repository for AI Tutor, a full-stack AI-powered learning platform.

Deployed Link
You can view the live API here:
https://ai-tutor-api-1-ryrc.onrender.com/

Key Features
RESTful API: Provides a clean and predictable API for the frontend to consume.

AI Integration: Leverages the Google Gemini API to generate dynamic, tailored lessons and quizzes.

User Management: Handles user registration and authentication.

Secure Payments: Integrates with IntaSend to manage user subscriptions and payment processing.

Data Persistence: Uses SQLAlchemy for database interactions.

Technical Stack
Framework: Python FastAPI

AI: Google Gemini API

Database: PostgreSQL (with SQLAlchemy)

Payments: IntaSend API

Dependency Management: Pipenv

Getting Started
To run the backend locally, follow these steps:

Clone the repository:

git clone [https://github.com/your-username/ai-tutor.git](https://github.com/your-username/ai-tutor.git)
cd ai-tutor/backend

Set up the environment:

Create a .env file in the backend directory.

Add your API keys and database URL.

GEMINI_API_KEY="your_gemini_api_key"
INTASEND_SECRET_KEY="your_intasend_secret_key"
DATABASE_URL="postgresql+asyncpg://user:password@host:port/dbname"

Install dependencies:

pipenv install

Run the development server:

pipenv run start

The API will be available at http://localhost:8000.