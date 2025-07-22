import express from "express";
import cors from "cors";
import HomeRoutes from "../src/routes/HomeRoutes.js"

const app = express();

app.use(cors());

app.use(express.json());

app.get("/v1/platform/health-check", (req, res) => {
  res.status(200).json({ status: "Server is up and running" });
});


app.use("/home",HomeRoutes);
export default app;