import React, { useState } from "react";
import { uploadMedia } from "../services/api";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [mediaURL, setMediaURL] = useState("");

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadMedia(formData);
        setMediaURL(res.data.url);
    };

    return (
        <div>
            <h2>Upload Your Photo or Video</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            {mediaURL && (
                <>
                    <h4>Uploaded:</h4>
                    {mediaURL.includes("video") ? (
                        <video src={mediaURL} controls width="400" />
                    ) : (
                        <img src={mediaURL} alt="Uploaded" width="400" />
                    )}
                </>
            )}
        </div>
    );
};

export default UploadPage;
