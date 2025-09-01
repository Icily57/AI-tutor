// import { createContext, useState, useEffect } from "react"; 

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);   // store user info
//   const [token, setToken] = useState(null); // store JWT
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");

//     if (savedToken && savedUser) {
//       setToken(savedToken);
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData, token) => {
//     setUser(userData);
//     setToken(token);
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // export function useAuth() {
// //   return useContext(AuthContext);
// // }

// // 👇 add this if you need direct access
// export { AuthContext };
