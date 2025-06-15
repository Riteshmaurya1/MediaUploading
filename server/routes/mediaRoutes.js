import express from "express";
import {
  uploadMedia,
  getAllMedia,
  deleteMedia,
} from "../controllers/mediaController.js";

const router = express.Router();

router.post("/upload", uploadMedia);
router.get("/all", getAllMedia);
router.delete("/:id", deleteMedia); // 👈 New delete route

export default router;
