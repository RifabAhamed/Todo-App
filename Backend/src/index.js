import dotenv from "dotenv";
import app from "./app.js";
import dbConfig from "./configs/dbConfig.js";
import updateTaskStatuses from "./utils/cronJobs.js";

dotenv.config();

const PORT = process.env.PORT || 8001;

async function startServer() {
  try {
    await dbConfig();
    updateTaskStatuses();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.stack || error);
    process.exit(1); 
  }
}

startServer();
