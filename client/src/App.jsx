import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Quizzes from "./pages/Quizzes";
import Payments from "./pages/Payments";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
