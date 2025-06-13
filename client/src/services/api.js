import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const uploadMedia = (formData) => API.post("/media/upload", formData);
