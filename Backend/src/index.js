import dotenv from 'dotenv';
import app from './app.js';
import dbConfig from './configs/dbConfig.js';

dotenv.config();

const PORT = process.env.PORT || 8001;

async function startServer() {
  try {
    // Initialize MongoDB connection
    await dbConfig();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.stack || error);
    process.exit(1); // Exit process on critical failure
  }
}

startServer();
