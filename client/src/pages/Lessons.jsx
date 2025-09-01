import { useState } from "react";
import API from "../api/axios";

export default function Lessons() {
  const [lesson, setLesson] = useState(null);

  const fetchLesson = async () => {
    const res = await API.get("/lessons/next/1"); // user_id=1 for demo
    setLesson(res.data.next_lesson);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Your Next Lesson</h2>
      <button
        onClick={fetchLesson}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Load Lesson
      </button>
      {lesson && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-bold">{lesson.title}</h3>
          <p>Level: {lesson.level}</p>
        </div>
      )}
    </div>
  );
}
