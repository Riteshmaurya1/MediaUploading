// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Upload media
export const uploadMedia = (formData) =>
  API.post("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Get all media
export const getAllMedia = () => API.get("/media/all");

// 🔥 Delete media by ID
export const deleteMedia = (id) => API.delete(`/media/${id}`);
