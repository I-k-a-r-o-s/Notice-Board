import Note from "../models/Note.js" // Import the Note model to interact with the notes collection in MongoDB

// Get all notes from the database
export async function getAllNotes(req, res) {
    try {
        // Find all notes and sort them by creation date (newest first)
        const notes = await Note.find().sort({ createdAt: -1 });
        // Send the notes as a JSON response with status 200 (OK)
        res.status(200).json(notes);
    } catch (error) {
        // If there's an error, log it and send a 500 (Internal Server Error) response
        console.error("Error in getAllNotes controller:", error);
        res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
}

// Get a single note by its ID
export async function getNoteByID(req, res) {
    try {
        // Find the note using the ID from the request parameters
        const note = await Note.findById(req.params.id);
        // If the note doesn't exist, send a 404 (Not Found) response
        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        // If found, send the note as a JSON response
        res.status(200).json(note);
    } catch (error) {
        // If there's an error, log it and send a 500 response
        console.error("Error in getNoteByID controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Create a new note
export async function createNotes(req, res) {
    try {
        // Get the title and content from the request body
        const { title, content } = req.body;
        // Create a new Note object
        const newNote = new Note({ title, content });
        // Save the new note to the database
        await newNote.save();
        // Send a success message and the new note as a JSON response
        res.status(201).json({
            message: "Note created successfully",
            note: newNote
        });
    } catch (error) {
        // If there's an error, log it and send a 500 response
        console.error("Error in createNotes controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Update an existing note by its ID
export async function updateNotes(req, res) {
    try {
        // Get the updated title and content from the request body
        const { title, content } = req.body;
        // Find the note by ID and update it with the new data
        // { new: true } returns the updated note
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        // If the note doesn't exist, send a 404 response
        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        // Send a success message and the updated note
        res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote
        });
    } catch (error) {
        // If there's an error, log it and send a 500 response
        console.error("Error in updateNote Controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Delete a note by its ID
export async function deleteNotes(req, res) {
    try {
        // Find the note by ID and delete it
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        // If the note doesn't exist, send a 404 response
        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }
        // Send a success message and the deleted note
        res.status(200).json({
            message: "Note deleted successfully",
            note: deletedNote
        });
    } catch (error) {
        // If there's an error, log it and send a 500 response
        console.error("Error in deleteNotes controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

