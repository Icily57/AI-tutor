import { useState } from "react";
import API from "../api/axios";

export default function Lessons() {
  const [lesson, setLesson] = useState(null);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLesson = async () => {
    if (!subject.trim()) {
      alert("Please enter a subject first!");
      return;
    }

    try {
      setLoading(true);
      // You can pass subject as query param or in the body
      const res = await API.get(`/lessons/next/1`, {
        params: { subject }, // 🔥 send subject to backend
      });
      setLesson(res.data.next_lesson);
    } catch (err) {
      console.error("Error fetching lesson:", err);
      alert("Failed to fetch lesson. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Next Lesson</h2>

      {/* Subject input */}
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject (e.g., Math, History, Biology)"
        className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Load button */}
      <button
        onClick={fetchLesson}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Loading..." : "Load Lesson"}
      </button>

      {/* Lesson display */}
      {lesson && (
        <div className="mt-6 p-4 border rounded bg-gray-100 shadow">
          <h3 className="font-bold text-lg">{lesson.title}</h3>
          <p className="mt-2">Level: {lesson.level}</p>
          <p className="mt-2">{lesson.content}</p>
        </div>
      )}
    </div>
  );
}
