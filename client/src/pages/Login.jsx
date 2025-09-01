// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const res = await fetch("http://localhost:8000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: new URLSearchParams({
//           username: form.email,
//           password: form.password,
//         }),
//       });

//       if (!res.ok) {
//         if (res.status === 403) {
//           throw new Error("Please verify your email before logging in.");
//         }
//         throw new Error("Login failed");
//       }

//       const data = await res.json();

//       // fetch user info
//       const meRes = await fetch("http://localhost:8000/auth/me", {
//         headers: { Authorization: `Bearer ${data.access_token}` },
//       });
//       const userData = await meRes.json();

//       login(userData, data.access_token);
//       navigate("/lessons");
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
//         <h2 className="text-2xl font-bold text-purple-700 mb-4">Login</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full mb-3 p-3 border rounded-lg"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full mb-3 p-3 border rounded-lg"
//         />

//         {error && <p className="text-red-500 mb-2">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
//         >
//           Login 🚀
//         </button>

//         <p className="mt-4 text-center">
//           Don’t have an account?{" "}
//           <span
//             className="text-purple-600 cursor-pointer"
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }
