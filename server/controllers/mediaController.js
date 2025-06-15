import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import Media from "../models/Media.js";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMedia = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.file;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    const newMedia = await Media.create({
      url: result.secure_url,
      type: result.resource_type,
      public_id: result.public_id,
    });

    fs.unlinkSync(file.tempFilePath); // Clean up

    res.status(201).json(newMedia);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

export const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.status(200).json(media);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch media" });
  }
};

// Optional: If you want downloadable links
export const downloadMedia = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  res.redirect(url);
};

export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    // Delete from Cloudinary
    const publicId = media.public_id;
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: media.type.includes("video") ? "video" : "image",
      });
    }

    // Delete from MongoDB
    await media.deleteOne();

    res.json({ message: "Media deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
