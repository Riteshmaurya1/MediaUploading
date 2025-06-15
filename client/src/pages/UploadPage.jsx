
import React, { useState } from "react";
import { uploadMedia } from "../services/api";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [mediaURL, setMediaURL] = useState("");
    const [progress, setProgress] = useState(0);
    const [isUploaded, setIsUploaded] = useState(false);
    const navigate = useNavigate();

    const handleFileDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setIsUploaded(false); // reset state on new file
        }
    };

    const handleUpload = async () => {
        if (!file) return toast.error("Please select a file");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await uploadMedia(formData, (event) => {
                setProgress(Math.round((event.loaded * 100) / event.total));
            });
            setMediaURL(res.data.url);
            toast.success("Uploaded successfully!");
            setIsUploaded(true);
            setProgress(0);
        } catch (error) {
            console.error(error);
            toast.error("Upload failed");
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setIsUploaded(false); // re-enable upload
        setMediaURL(""); // clear preview
    };

    return (
        <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16"
        >
            <Toaster />

            <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-white">
                    🚀 Upload Photo or Video
                </h2>

                <div className="mb-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-zinc-300 bg-zinc-800 rounded-lg border border-zinc-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 transition"
                    />
                </div>

                {progress > 0 && (
                    <div className="mb-4 w-full bg-zinc-700 rounded-lg overflow-hidden">
                        <div
                            className="bg-indigo-600 h-2"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!file || isUploaded}
                    className={`w-full transition text-white py-2 rounded-lg font-medium ${!file || isUploaded
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-500"
                        }`}
                >
                    {isUploaded ? "Uploaded" : "Upload"}
                </button>

                {mediaURL && (
                    <div className="mt-6">
                        <h4 className="text-lg font-medium text-zinc-300 mb-2">Uploaded:</h4>
                        <div className="rounded-lg overflow-hidden shadow-md">
                            {mediaURL.includes("video") ? (
                                <video src={mediaURL} controls className="w-full rounded-lg" />
                            ) : (
                                <img src={mediaURL} alt="Uploaded media" className="w-full rounded-lg" />
                            )}
                        </div>
                        <a
                            href={mediaURL}
                            download
                            className="block mt-3 text-sm text-indigo-400 hover:underline"
                        >
                            Download Media
                        </a>
                        <div className="mt-3 bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium text-center">
                            ✅ File uploaded successfully!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadPage;
