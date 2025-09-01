import { useState } from "react";
import API from "../api/axios";
import { BookOpen, Loader2, AlertCircle, Sparkles, Lightbulb } from "lucide-react";

export default function Lessons() {
  const [lesson, setLesson] = useState(null);
  const [history, setHistory] = useState([]);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchLesson = async () => {
    if (!subject.trim()) {
      alert("Please enter a subject first!");
      return;
    }

    try {
      setLoading(true);
      setLesson(null);
      setError(false);

      const res = await API.get(`/lessons/next/1`, {
        params: { subject },
      });

      if (!res.data?.next_lesson) {
        setError(true);
      } else {
        setLesson(res.data.next_lesson);
        setHistory((prev) => [res.data.next_lesson, ...prev.slice(0, 4)]); // keep last 5 lessons
      }
    } catch (err) {
      console.error("Error fetching lesson:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const cleanText = (text) => {
    return text.replace(/\*\*/g, "").replace(/\*/g, "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 relative overflow-hidden">
      {/* Decorative Icons */}
      <div className="absolute top-10 left-10 text-blue-400 opacity-40 animate-bounce-slow">
        <BookOpen size={40} />
      </div>
      <div className="absolute bottom-16 right-12 text-pink-400 opacity-30 animate-pulse">
        <Sparkles size={36} />
      </div>

      {/* Header */}
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800 dark:text-white flex items-center justify-center gap-3 drop-shadow">
        <BookOpen className="w-10 h-10 text-blue-500 animate-bounce" />
        Discover Your Next Lesson ✨
      </h2>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter a subject (e.g. Math, History)"
          className="flex-1 px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-4 focus:ring-pink-300 focus:outline-none text-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <button
          onClick={fetchLesson}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-white text-lg font-semibold transition-all shadow-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-pink-500 hover:scale-105 active:scale-95"
          }`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Load"}
        </button>
      </div>

      {/* How to Use */}
      {!lesson && !loading && !error && (
        <div className="max-w-2xl mx-auto mb-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-6 space-y-4 text-center animate-fade-in">
          <Lightbulb className="w-10 h-10 text-yellow-500 mx-auto" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">How it works</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enter any subject in the box above — like <span className="font-semibold">Math, Science, or History</span> — and we’ll generate a lesson tailored just for you.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Each lesson is broken down into easy-to-read steps so you can learn faster and stay motivated.
          </p>
        </div>
      )}

      {/* Motivation */}
      {!lesson && !loading && !error && (
        <div className="max-w-2xl mx-auto mb-12 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 dark:from-blue-950 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow p-6 text-center animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">🌟 Keep Going!</h3>
          <p className="text-gray-700 dark:text-gray-400 italic">
            “Small daily improvements lead to big results. Every lesson you complete brings you closer to your goals.” 💪
          </p>
        </div>
      )}

      {/* Skeleton Loader */}
      {loading && (
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
          <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-600 rounded" />
          <div className="space-y-3">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            ))}
          </div>
        </div>
      )}

      {/* No Lesson Found */}
      {!loading && error && (
        <div className="max-w-xl mx-auto bg-yellow-50 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 p-6 rounded-2xl text-center text-yellow-700 dark:text-yellow-300 space-y-4 shadow-lg animate-fade-in">
          <AlertCircle className="w-8 h-8 mx-auto" />
          <h3 className="text-xl font-bold">Hmm... No lesson yet 🧐</h3>
          <p>Try another subject — I bet we’ll find something fun!</p>
        </div>
      )}

      {/* Lesson Card */}
      {lesson && !loading && (
        <div className="max-w-3xl mx-auto mt-8 bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-pink-100 to-blue-100 dark:from-blue-950 dark:to-gray-800">
            <div className="text-xl font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
              📘 {cleanText(lesson.title)}
            </div>
            <span className="text-xs font-medium uppercase bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full shadow">
              {lesson.level}
            </span>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6 text-gray-700 dark:text-gray-300">
            {lesson.content.split("\n").map((para, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 border-l-4 border-pink-400 dark:border-pink-600 shadow-md px-5 py-4 rounded-lg text-base leading-relaxed"
              >
                {cleanText(para)}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gradient-to-r from-pink-100 to-blue-100 dark:from-gray-800 dark:to-blue-900 text-sm text-gray-600 dark:text-gray-400 text-right italic border-t border-gray-100 dark:border-gray-700">
            Powered by <span className="font-bold text-pink-500">SmartTutor AI</span> 🌟
          </div>
        </div>
      )}

      {/* History Section */}
      {history.length > 1 && (
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">📚 Recently Viewed</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.slice(1).map((h, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:scale-105 transition cursor-pointer"
                onClick={() => setLesson(h)}
              >
                <h4 className="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-2">
                  {cleanText(h.title)}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{cleanText(h.content)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
