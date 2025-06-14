import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import mediaRoutes from "./routes/mediaRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp",
  })
);

app.use("/api/media", mediaRoutes);

export default app;
