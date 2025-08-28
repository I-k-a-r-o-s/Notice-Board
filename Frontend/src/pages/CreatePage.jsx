import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router' // Note: in many projects this comes from 'react-router-dom'
import { toast } from 'react-hot-toast';
import api from '../lib/axios.js';

// This component renders a "Create Notice" page with a form.
// A beginner-friendly walkthrough is provided via inline comments.
const CreatePage = () => {
  // useState creates state variables that persist between renders.
  // title and content hold the values typed by the user.
  // loading is true while the form submission is in progress.
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // useNavigate returns a function we can call to change the page (programmatic navigation).
  const navigate = useNavigate();

  // handleSubmit handles when the user submits the form.
  // It is marked async because we wait for an API request to finish.
  const handleSubmit = async (e) => {
    // preventDefault stops the browser from reloading the page when the form is submitted.
    e.preventDefault();

    // Basic validation: check that both fields are not empty (trim removes whitespace).
    if (!title.trim() || !content.trim()) {
      // toast displays a small, temporary message to the user.
      toast.error("Please fill in all fields");
      return; // stop running the rest of the function
    }

    // Set loading so the UI can show a spinner or disable the button.
    setLoading(true);
    try {
      // Send the new notice to the server. api is an axios instance configured elsewhere.
      // We await the response so we can react to success or failure.
      await api.post("/notes", { title, content });

      // On success, show a success toast and navigate back to the list page.
      toast.success("Notice created successfully");
      navigate("/"); // programmatic navigation — same as clicking a Link to '/'
    } catch (error) {
      // If something goes wrong (network/server error), log it and show an error toast.
      console.error("Error creating Notice", error);
      toast.error("Error creating Notice");
    } finally {
      // Always turn off loading whether the request succeeded or failed.
      setLoading(false);
    }
  }

  // The JSX below looks like HTML but it's actually how React describes UI.
  // Think of it as a tree of elements that React will turn into real DOM elements.
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Back link — a normal Link so navigation is instant (single-page behavior) */}
          <Link to={"/"} className="inline-flex items-center gap-2 mb-6 opacity-90 hover:opacity-100 transition">
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="text-sm">Back to Notice Board</span>
          </Link>

          {/* Card — visual container for the form */}
          <div className="rounded-2xl bg-base-100 border border-base-300/40 shadow-lg overflow-hidden">
            <div className="p-8">
              <header className="mb-6">
                <h2 className="text-2xl font-semibold mb-1">Create a new Notice</h2>
                <p className="text-sm opacity-70">Write a short, clear title and the full notice content below.</p>
              </header>

              {/* The form element groups inputs and lets us handle submission with onSubmit */}
              <form onSubmit={handleSubmit} aria-busy={loading}>
                {/* Title input */}
                <div className="form-control mb-4 flex flex-col gap-2 w-full">
                  <label htmlFor="title" className="label">
                    <span className="label-text text-sm font-medium">Title</span>
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter title"
                    // Tailwind utility classes for styling — you don't need to worry about them right now.
                    className="input input-bordered w-full rounded-lg placeholder-gray-500"
                    value={title} // controlled input: value comes from React state
                    onChange={(e) => setTitle(e.target.value)} // update state when the user types
                    aria-label="Notice title" // accessibility label for screen readers
                  />
                  <p className="text-xs opacity-60 mt-1">Keep it short — the title appears on the board.</p>
                </div>

                {/* Content textarea */}
                <div className="form-control mb-6 flex flex-col gap-2 w-full">
                  <label htmlFor="content" className="label">
                    <span className="label-text text-sm font-medium">Content</span>
                  </label>

                  <textarea
                    id="content"
                    name="content"
                    placeholder="Write notice content"
                    className="textarea textarea-bordered h-36 w-full rounded-lg placeholder-gray-500"
                    value={content} // controlled textarea
                    onChange={(e) => setContent(e.target.value)} // update state as the user types
                    aria-label="Notice content"
                  />
                  <p className="text-xs opacity-60 mt-1">Be descriptive so the readers can understand.</p>
                </div>

                {/* Actions — submit button */}
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    // When loading is true we add the 'loading' class so the button shows a spinner.
                    className={`btn btn-primary ${loading ? 'loading' : ''}`}
                    disabled={loading} // disable the button while submitting to prevent duplicate requests
                    aria-disabled={loading} // accessibility attribute mirroring the disabled state
                  >
                    {loading ? 'Creating...' : 'Create Notice'}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePage;
