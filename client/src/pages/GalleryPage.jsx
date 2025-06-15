import { useEffect, useState } from "react";
import { getAllMedia } from "../services/api";

const GalleryPage = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    getAllMedia().then(res => setMedia(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📂 Your Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {media.map(item => (
          <div key={item._id} className="bg-zinc-800 p-4 rounded-lg shadow-md">
            {item.type.includes("video") ? (
              <video src={item.url} controls className="rounded-lg w-full" />
            ) : (
              <img src={item.url} alt="media" className="rounded-lg w-full" />
            )}
            <a href={item.url} download className="block text-center mt-2 text-indigo-400 hover:underline">
              ⬇️ Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
