import express from 'express'; // Import Express framework
import { createNotes, deleteNotes, getAllNotes, getNoteByID, updateNotes } from '../controllers/nodesControllers.js'; // Import controller functions

const router = express.Router(); // Create a new router object

// Route to get all notes (GET /api/notes)
router.get("/", getAllNotes);

// Route to get a single note by ID (GET /api/notes/:id)
router.get("/:id", getNoteByID);

// Route to create a new note (POST /api/notes)
router.post("/", createNotes);

// Route to update a note by ID (PUT /api/notes/:id)
router.put("/:id", updateNotes);

// Route to delete a note by ID (DELETE /api/notes/:id)
router.delete("/:id", deleteNotes);

// Export the router so it can be used in server.js
export default router;