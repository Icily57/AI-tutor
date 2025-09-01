import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-b-3xl shadow-lg">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          👋 Welcome to AI Tutor
        </h1>
        <p className="mt-4 text-xl max-w-2xl mx-auto">
          Your personal study companion. Learn smarter, practice better, and
          track your progress — all powered by AI.
        </p>
        <div className="mt-6">
          <Link
            to="/lessons"
            className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-md hover:bg-yellow-300 transition"
          >
            Start Learning 🚀
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="px-8 py-14 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">
          Why Choose AI Tutor?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Learning doesn’t have to feel boring or stressful. AI Tutor creates{" "}
          <span className="font-semibold text-purple-600">
            personalized lessons
          </span>
          , gives you{" "}
          <span className="font-semibold text-green-600">
            adaptive quizzes
          </span>{" "}
          to test your knowledge, and helps you{" "}
          <span className="font-semibold text-blue-600">track progress</span> so
          you stay motivated every step of the way.
        </p>
      </div>

      {/* How It Works */}
      <div className="px-8 py-10 bg-white rounded-3xl shadow-inner max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-8">
          How It Works
        </h2>
        <div className="grid gap-8 sm:grid-cols-3 text-center">
          <div className="p-6">
            <div className="text-4xl">📚</div>
            <h3 className="text-lg font-semibold text-purple-700 mt-2">
              Step 1: Learn
            </h3>
            <p className="text-gray-600">
              Dive into interactive lessons tailored to your subject and level.
            </p>
          </div>
          <div className="p-6">
            <div className="text-4xl">📝</div>
            <h3 className="text-lg font-semibold text-green-700 mt-2">
              Step 2: Practice
            </h3>
            <p className="text-gray-600">
              Take quizzes that adapt to your learning pace and challenge you.
            </p>
          </div>
          <div className="p-6">
            <div className="text-4xl">📊</div>
            <h3 className="text-lg font-semibold text-blue-700 mt-2">
              Step 3: Track
            </h3>
            <p className="text-gray-600">
              Watch your progress grow with insights and achievements.
            </p>
          </div>
        </div>
      </div>

      {/* Motivation Section */}
      <div className="mt-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Stay Motivated 🌟
        </h2>
        <p className="text-lg text-gray-700 italic max-w-2xl mx-auto">
          “Education is the passport to the future, for tomorrow belongs to
          those who prepare for it today.” – Malcolm X
        </p>
      </div>

      {/* Call To Action */}
      <div className="mt-12 flex justify-center pb-16">
        <Link
          to="/quizzes"
          className="px-8 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition"
        >
          Try a Quiz Now 🎯
        </Link>
      </div>
    </div>
  );
}
