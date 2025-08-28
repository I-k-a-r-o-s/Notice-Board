import mongoose from "mongoose"; // Import mongoose to interact with MongoDB

// Define the schema (structure) for a Note document in MongoDB
const noteSchema = new mongoose.Schema({
    title: {
        type: String,      // The title must be a string
        required: true,    // The title is required (cannot be empty)
        trim: true,        // Remove whitespace from the beginning and end
    },
    content: {
        type: String,      // The content must be a string
        required: true,    // The content is required
        trim: true,        // Remove whitespace from the beginning and end
    },
}, {
    timestamps: true,      // Automatically add createdAt and updatedAt fields
});

// Create a Note model using the schema, which lets us interact with the notes collection
const Note = mongoose.model("Note", noteSchema);

// Export the Note model so it can be used in other files
export default Note;