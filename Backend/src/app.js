import express from "express";
import cors from "cors";
import HomeRoutes from "../src/routes/HomeRoutes.js"
// import "../src/utils/cronJobs.js";

const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Health-check route
app.get("/v1/platform/health-check", (req, res) => {
  res.status(200).json({ status: "Server is up and running" });
});


app.use("/home",HomeRoutes);
export default app;