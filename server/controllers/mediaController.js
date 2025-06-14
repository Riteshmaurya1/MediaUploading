import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadMedia = async (req, res) => {
  try {
    const file = req.files.file;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto", // supports images and videos
      folder: "user_uploads",
    });

    fs.unlinkSync(file.tempFilePath);

    res.status(200).json({ url: result.secure_url, type: result.resource_type });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};
