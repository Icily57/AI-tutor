// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", name: "", password: "" });
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setMessage("");

//     try {
//       const res = await fetch("http://localhost:8000/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.detail || "Signup failed");
//       }

//       setMessage("✅ Signup successful! Please check your email to verify.");
//       setTimeout(() => navigate("/login"), 2500); // redirect after delay
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-purple-700 mb-4">Sign Up</h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full mb-3 p-3 border rounded-lg"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full mb-3 p-3 border rounded-lg"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full mb-3 p-3 border rounded-lg"
//           minLength={6}
//           required
//         />

//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         {message && <p className="text-green-600 mb-2">{message}</p>}

//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
//         >
//           Sign Up 🚀
//         </button>

//         <p className="mt-4 text-center">
//           Already have an account?{" "}
//           <span
//             className="text-purple-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }
