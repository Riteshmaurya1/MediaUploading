import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Upload media (already present)
export const uploadMedia = (formData) => API.post("/media/upload", formData);

// ✅ Add this new function:
export const getAllMedia = () => API.get("/media/all");
