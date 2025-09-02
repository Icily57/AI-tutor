# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

AI Tutor Frontend
Welcome to the AI Tutor web application! This is the frontend repository for a dynamic, AI-powered learning platform designed to help students learn, practice, and track their progress in various subjects.

Features
This application is built with React and features several key components:

Home (Home.jsx): A welcoming landing page that introduces the platform, its benefits, and a clear call to action to begin learning or try a quiz.

Lessons (Lessons.jsx): An interactive lesson module where users can generate a new lesson on any subject. The AI provides a detailed lesson plan tailored to the user's request.

Quizzes (Quizzes.jsx): A quiz generator that creates beginner-level, multiple-choice quizzes on any topic. This feature is perfect for self-assessment and knowledge reinforcement.

Payments (Payments.jsx): A payments page where users can manage their subscription. It includes a section for creating a new checkout session and a mock transaction history.

Technical Stack
Frontend: React

Styling: Tailwind CSS for a modern, responsive design.

Routing: React Router DOM for seamless navigation between pages.

API Integration: The application communicates with a backend API (assumed to be running separately) for generating content like lessons and quizzes.

Getting Started
To run this project locally, follow these steps:

Clone the repository:

git clone [https://github.com/your-username/ai-tutor-frontend.git](https://github.com/your-username/ai-tutor-frontend.git)
cd ai-tutor-frontend

Install dependencies:

npm install

Configure the API:
Make sure you have a backend API running that provides endpoints for /lessons/next/1, /quizzes/generate, and /payments/checkout. The axios configuration might need to be updated to point to your backend's URL.

Run the application:

npm run dev

The application should now be running at http://localhost:5173 (or a similar address).

Contribution
Contributions are welcome! If you have suggestions for new features, bug fixes, or improvements, please feel free to open a pull request.