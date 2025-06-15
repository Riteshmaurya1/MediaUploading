// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

const HomePage = () => (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">📸 Media Vault</h1>
        <p className="text-lg text-zinc-400 max-w-xl mb-8">
            Upload, view, and download your photos and videos from anywhere. Secure. Fast. Beautiful.
        </p>
        <div className="space-x-4">
            <Link to="/upload" className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition">
                Upload Media
            </Link>
            <Link to="/gallery" className="border border-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition">
                View Gallery
            </Link>
        </div>
    </div>
);

export default HomePage;