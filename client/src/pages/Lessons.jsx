import { useState } from "react";
import API from "../api/axios";
import { BookOpen, Loader2, AlertCircle } from "lucide-react";

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

      const res = await API.get(`/lessons/next/1`, { params: { subject } });

      if (!res.data?.next_lesson) {
        setError(true);
      } else {
        setLesson(res.data.next_lesson);
        setHistory((prev) => [res.data.next_lesson, ...prev.slice(0, 4)]);
      }
    } catch (err) {
      console.error("Error fetching lesson:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const cleanText = (text) => text.replace(/\*\*/g, "").replace(/\*/g, "");

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      {/* Hero Section */} 
     <div className="text-center py-16 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-b-3xl shadow-lg">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          <BookOpen className="w-10 h-10 text-black animate-bounce" />
          Discover Your Next Lesson ✨
        </h1>
         <p className="mt-4 text-xl max-w-2xl mx-auto">
          🌟 “Small daily improvements lead to big results. Every lesson you complete brings you closer to your goals.” 💪
        </p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-10 px-8 py-14 text-center max-w-4xl mx-auto">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter a subject (e.g. Math, History)"
          className="flex-1 px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-4 focus:ring-purple-300 focus:outline-none text-lg bg-white"
        />
        <button
          onClick={fetchLesson}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-white text-lg font-semibold transition-all shadow-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 active:scale-95"
          }`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Load"}
        </button>
      </div>

      {/* No Lesson Found */}
      {!loading && error && (
        <div className="max-w-xl mx-auto bg-yellow-50 border border-yellow-300 p-6 rounded-2xl text-center text-yellow-700 shadow-lg">
          <AlertCircle className="w-8 h-8 mx-auto" />
          <h3 className="text-xl font-bold">Hmm... No lesson yet 🧐</h3>
          <p>Try another subject — we’ll find something exciting for you!</p>
        </div>
      )}

      {/* Lesson Card */}
      {lesson && !loading && (
        <div className="max-w-3xl mx-auto mt-8 bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-between">
            <div className="text-xl font-bold text-purple-700 flex items-center gap-2">
              📘 {cleanText(lesson.title)}
            </div>
            <span className="text-xs font-medium uppercase bg-purple-200 text-purple-700 px-3 py-1 rounded-full shadow">
              {lesson.level}
            </span>
          </div>

          <div className="p-8 space-y-6 text-gray-700">
            {lesson.content.split("\n").map((para, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 shadow px-5 py-4 rounded-lg text-base leading-relaxed"
              >
                {cleanText(para)}
              </div>
            ))}
          </div>

          <div className="px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-100 text-sm text-gray-600 text-right italic border-t">
            Powered by <span className="font-bold text-purple-600">SmartTutor AI</span> 🌟
          </div>
        </div>
      )}

      {/* History Section */}
      {history.length > 1 && (
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-2xl font-bold text-purple-700 mb-6">📚 Recently Viewed</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.slice(1).map((h, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl shadow hover:scale-105 transition cursor-pointer"
                onClick={() => setLesson(h)}
              >
                <h4 className="font-semibold text-lg text-blue-700 mb-2">
                  {cleanText(h.title)}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {cleanText(h.content)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
