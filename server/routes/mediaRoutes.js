import express from "express";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const file = req.files.image;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "mediaUploader", // Optional: folder name in Cloudinary
    });

    // Delete temp file
    fs.unlinkSync(file.tempFilePath);

    res.status(200).json({
      message: "Upload successful",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

export default router;
