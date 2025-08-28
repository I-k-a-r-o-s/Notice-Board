import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router"; // For navigation between pages without reloading
import { formatDate } from "../lib/utils.js"; // Utility to format dates
import api from "../lib/axios.js"; // Axios instance for API calls
import toast from "react-hot-toast"; // For showing notification messages

// NoteCard component displays a single note as a styled card with edit and delete options.
const NoteCard = ({ note, setNotes }) => {
  // deleteNote function deletes a note when user confirms the action.
  const deleteNote = async (e, id) => {
    e.preventDefault(); // Prevent default behavior (avoids navigation when clicking delete)

    // Confirm action with user before deleting
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return; // Stop if user cancels
    }

    try {
      // API call to delete the note by ID
      api.delete(`/notes/${id}`);

      // Update UI instantly by removing the deleted note from the state (optimistic update)
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

      // Show success message using toast
      toast.success("Deleted Successfully");
    } catch (error) {
      // Log error and show error toast
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    // Outer Link turns the whole card into a clickable link to the note details page
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-xl hover:scale-105 transition-all duration-300 border-t-4 border-solid border-secondary rounded-2xl shadow-lg"
    >
      <div className="card-body p-6">
        {/* Title section */}
        <h3 className="card-title text-lg font-semibold text-base-content mb-2">
          {note.title}
        </h3>

        {/* Short preview of note content */}
        <p className="text-base-content/70 line-clamp-3 text-sm">
          {note.content}
        </p>

        {/* Footer with date and action buttons */}
        <div className="card-actions justify-between items-center mt-4">
          {/* Display formatted date */}
          <span className="text-xs text-base-content/60 italic">
            {formatDate(note.createdAt)}
          </span>

          {/* Action buttons for edit and delete */}
          <div className="flex items-center gap-3">
            {/* Edit icon (currently not linked, just visual) */}
            <PenSquareIcon className="size-5 text-accent hover:text-accent-focus transition duration-200 cursor-pointer" />

            {/* Delete button */}
            <button
              className="btn btn-ghost btn-xs text-error hover:text-pink-400 hover:scale-125 transition-all duration-200"
              onClick={(e) => deleteNote(e, note._id)}
            >
              <Trash2Icon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
