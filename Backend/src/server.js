import express from "express"; // Import Express framework to build the server
import notesRoutes from "./routes/notesRoutes.js"; // Import routes for handling notes API requests
import connectDB from "./config/db.js"; // Import function to connect to MongoDB database
import dotenv from "dotenv"; // Import dotenv to load environment variables from .env file
import cors from "cors"; // Import CORS middleware to handle cross-origin requests

dotenv.config(); // Load environment variables (like database URI and port) from .env file

const app = express(); // Create an Express application instance
const PORT = process.env.PORT || 5000; // Set the port for the server (use value from .env or default to 5000)

app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing) to allow requests from different origins

app.use(express.json()); // Middleware to automatically parse incoming JSON data in requests

app.use("/api/notes", notesRoutes); // Use the notes routes for any request starting with /api/notes

// Connect to the database, then start the server and listen for requests
(async() => {
  try {
    await connectDB(); // Wait for the database to connect
    app.listen(PORT, () => {
      console.log("Server is running on PORT:", PORT); // Log a message indicating the server is running
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err); // Log an error message if the database connection fails
    process.exit(1); // Exit the process with failure
  }
})(); // Immediately invoke the async function to start the server
// This ensures that the server only starts if the database connection is successful  