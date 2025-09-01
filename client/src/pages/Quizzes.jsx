import { useState } from "react";
import API from "../api/axios";
import {
  Loader2,
  Pencil,
  HelpCircle,
  Info,
  Award,
  BookOpen,
  Lightbulb,
  Target,
} from "lucide-react";

export default function Quizzes() {
  const [quiz, setQuiz] = useState(null);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) return alert("Please enter a topic!");

    setLoading(true);
    try {
      const res = await API.post(`/quizzes/generate`, {
        topic: topic,
        level: "beginner",
      });
      setQuiz(res.data); // ✅ make sure your backend returns { questions: [...] }
    } catch (err) {
      console.error("Error generating quiz:", err);
      alert("Failed to generate quiz. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      {/* === Hero Section === */}
      <div className="text-center py-16 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-b-3xl shadow-lg">
         <h2 className="text-5xl font-extrabold drop-shadow-lg">
          <Pencil className="w-8 h-8 text-black animate-bounce" />
          Generate a Fun Quiz 🎯
        </h2>
         <p className="mt-4 text-xl max-w-2xl mx-auto">
          Type a topic you’re curious about, and we’ll generate a fun beginner
          quiz for you! Perfect for revision, learning new things, or just
          testing your knowledge.
        </p>
      </div>

      {/* === Input Section === */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mt-10">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g. Space, History, Animals)"
          className="flex-1 px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-4 focus:ring-green-300 focus:outline-none text-lg bg-white"
        />
        <button
          onClick={generateQuiz}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-white text-lg font-semibold transition-all shadow-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-blue-500 hover:scale-105 active:scale-95"
          }`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "Generate"
          )}
        </button>
      </div>

      {/* === Extra Info === */}
      <div className="max-w-3xl mx-auto my-12 grid sm:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex items-start gap-3">
          <Info className="w-8 h-8 text-blue-500" />
          <p className="text-gray-700">
            Each quiz contains multiple choice questions. Challenge yourself and
            see how many you get right. The more you practice, the better you
            get!
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex items-start gap-3">
          <BookOpen className="w-8 h-8 text-purple-500" />
          <p className="text-gray-700">
            Quizzes are designed for{" "}
            <span className="font-bold">beginner level</span> learners but can
            still be fun for all ages.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex items-start gap-3">
          <Lightbulb className="w-8 h-8 text-yellow-500" />
          <p className="text-gray-700">
            Tip: After finishing, try writing your own questions on the same
            topic to test deeper understanding.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex items-start gap-3">
          <Target className="w-8 h-8 text-red-500" />
          <p className="text-gray-700">
            Stay consistent! Practicing a little each day builds long-term
            knowledge and confidence.
          </p>
        </div>
      </div>

      {/* === Quiz Display === */}
      {quiz && quiz.questions && (
        <div className="max-w-3xl mx-auto mt-8 bg-gradient-to-br from-white to-green-50 border border-gray-200 rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Your Quiz</h3>
            <span className="flex items-center gap-2 text-green-600 font-medium">
              <Award className="w-5 h-5" /> Beginner Level
            </span>
          </div>

          {quiz.questions.map((q, i) => (
            <div
              key={q.id || i}
              className="p-6 bg-white border-l-4 border-green-400 rounded-xl shadow-md"
            >
              <p className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-green-500" />
                {q.prompt}
              </p>
              <ul className="list-disc ml-8 mt-3 space-y-1 text-gray-700">
                {q.choices.map((opt, j) => (
                  <li key={j}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="max-w-3xl mx-auto mt-12 text-center text-gray-600 italic">
        Keep practicing, explore different topics, and unlock new knowledge
        every day 🌟
      </div>
    </div>
  );
}
