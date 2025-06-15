// src/components/MediaCard.jsx
import React from "react";
import { Download } from "lucide-react";

const MediaCard = ({ url, type }) => {
  const isVideo = type === "video";

  const handleDownload = () => {
    // Add `fl_attachment` to force download in Cloudinary
    const forceDownloadURL = url.replace("/upload/", "/upload/fl_attachment/");
    const a = document.createElement("a");
    a.href = forceDownloadURL;
    a.download = `media-${Date.now()}.${isVideo ? "mp4" : "jpg"}`; // dynamic file name
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition w-full max-w-sm">
      <div className="aspect-video">
        {isVideo ? (
          <video
            src={url}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={url}
            alt="Uploaded media"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <span className="text-sm text-zinc-400">
          {isVideo ? "Video" : "Image"}
        </span>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 text-indigo-500 hover:text-indigo-400"
        >
          <Download size={18} />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default MediaCard;
