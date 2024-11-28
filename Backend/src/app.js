import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Health-check route
app.get("/v1/platform/health-check", (req, res) => {
  res.status(200).json({ status: "Server is up and running" });
});

export default app;