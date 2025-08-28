import mongoose from "mongoose"; // Import mongoose for database connection

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Try to connect using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        // If connection fails, log the error and exit the process
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
};

// Export the function so it can be used in server.js
export default connectDB;
