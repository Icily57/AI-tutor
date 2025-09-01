import { useState } from "react";
import API from "../api/axios";
import { BookOpen, Loader2, AlertCircle } from "lucide-react";

export default function Lessons() {
  const [lesson, setLesson] = useState(null);
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
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-100 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 transition-all">
      {/* Header */}
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800 dark:text-white flex items-center justify-center gap-3 drop-shadow-sm">
        <BookOpen className="w-8 h-8 text-blue-500 animate-pulse" />
        Your Next Lesson
      </h2>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter a subject"
          className="flex-1 px-5 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <button
          onClick={fetchLesson}
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white text-lg font-semibold transition-all shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:scale-95"
          }`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Load"}
        </button>
      </div>

      {/* === Skeleton Loader === */}
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

      {/* === No Lesson Found === */}
      {!loading && error && (
        <div className="max-w-xl mx-auto bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-700 p-6 rounded-xl text-center text-red-700 dark:text-red-300 space-y-4">
          <AlertCircle className="w-8 h-8 mx-auto" />
          <h3 className="text-xl font-semibold">Oops! No lesson found 😢</h3>
          <p>We couldn’t find a lesson for that subject. Try another one!</p>
        </div>
      )}

      {/* === Creative Lesson Card === */}
      {lesson && !loading && (
        <div className="max-w-3xl mx-auto mt-8 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-blue-100 dark:bg-blue-950">
            <div className="text-xl font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
              📘 {cleanText(lesson.title)}
            </div>
            <span className="text-xs font-medium uppercase bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full">
              {lesson.level}
            </span>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6 text-gray-700 dark:text-gray-300">
            {lesson.content.split("\n").map((para, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 border-l-4 border-blue-400 dark:border-blue-600 shadow-md px-5 py-4 rounded-lg text-base leading-relaxed"
              >
                {cleanText(para)}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-blue-50 dark:bg-blue-900 text-sm text-gray-600 dark:text-gray-400 text-right italic border-t border-gray-100 dark:border-gray-700">
            Powered by SmartTutor AI ✨
          </div>
        </div>
      )}
    </div>
  );
}
