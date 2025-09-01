import { useState } from "react";
import API from "../api/axios";

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
      setQuiz(res.data.quiz);
    } catch (err) {
      console.error("Error generating quiz:", err);
      alert("Failed to generate quiz. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Generate a Quiz</h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic..."
        className="border p-2 mr-2"
      />
      <button
        onClick={generateQuiz}
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {quiz && quiz.questions && (
        <div className="mt-6">
          {quiz.questions.map((q, i) => (
            <div key={i} className="mb-4 p-4 border rounded bg-gray-50">
              <p className="font-semibold">{q.question}</p>
              <ul className="list-disc ml-6">
                {q.options.map((opt, j) => (
                  <li key={j}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
