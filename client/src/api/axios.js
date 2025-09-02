import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-tutor-api-1-ryrc.onrender.com/", // your FastAPI backend
});

export default API;
