import React, { useState } from "react";
import { uploadMedia } from "../services/api";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [mediaURL, setMediaURL] = useState("");

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadMedia(formData);
        setMediaURL(res.data.url);
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-white">
                    🚀 Upload Photo or Video
                </h2>

                <div className="mb-4">
                    <input
                        type="file"
                        className="block w-full text-sm text-zinc-300 bg-zinc-800 rounded-lg border border-zinc-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 transition"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <button
                    onClick={handleUpload}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 transition text-white py-2 rounded-lg font-medium"
                >
                    Upload
                </button>

                {mediaURL && (
                    <div className="mt-6">
                        <h4 className="text-lg font-medium text-zinc-300 mb-2">Uploaded:</h4>
                        <div className="rounded-lg overflow-hidden shadow-md">
                            {mediaURL.includes("video") ? (
                                <video
                                    src={mediaURL}
                                    controls
                                    className="w-full rounded-lg"
                                />
                            ) : (
                                <img
                                    src={mediaURL}
                                    alt="Uploaded media"
                                    className="w-full rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadPage;
