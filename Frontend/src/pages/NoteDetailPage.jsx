import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import api from '../lib/axios.js';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';

// NoteDetailPage component: shows and allows editing of a single notice
const NoteDetailPage = () => {
  // --- React state hooks ---
  // `note` - the data object for the current notice (title, content).
  // `loading` - true while the page is fetching data from the API.
  // `saving` - true while the page is sending an update to the API.
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // `navigate` lets us programmatically go to other routes (e.g. navigate("/")).
  const navigate = useNavigate();

  // Grab the `id` route param from the URL (e.g. /notes/123 -> id = "123").
  const { id } = useParams();

  // --- Fetch the note whenever `id` changes ---
  useEffect(() => {
    const fetchNote = async () => {
      try {
        // Start loading (shows loading UI)
        setLoading(true);

        // Call your API to get the note data
        const response = await api.get(`/notes/${id}`);
        setNote(response.data); // put the fetched data into state
      } catch (error) {
        // If anything goes wrong, log and notify user, then go back to list
        console.error('Error fetching note', error);
        toast.error('Failed to fetch Notice!');
        navigate('/');
      } finally {
        // Turn off loading regardless of success or failure
        setLoading(false);
      }
    };

    // Call the async fetching function (we can't make useEffect's argument async directly)
    fetchNote();
  }, [id, navigate]);

  // --- Handler: delete the note ---
  const handleDelete = async () => {
    // Ask user to confirm before deleting (this cannot be undone)
    if (!window.confirm('Are you sure you want to delete this notice? This action cannot be undone.')) {
      return; // user cancelled
    }

    try {
      await api.delete(`/notes/${id}`); // call DELETE endpoint
      toast.success('Notice deleted successfully!');
      navigate('/'); // return to home after deletion
    } catch (error) {
      console.error('Error deleting note', error);
      toast.error('Failed to delete Notice!');
    }
  };

  // --- Handler: save/update the note ---
  const handleSave = async () => {
    // Basic validation: ensure title and content are not empty or whitespace
    if (!note?.title?.trim() || !note?.content?.trim()) {
      toast.error('Title and Content are required!');
      return;
    }

    setSaving(true); // show saving UI state

    try {
      await api.put(`/notes/${id}`, note); // send PUT request with updated note
      toast.success('Notice updated successfully!');
      // NOTE: we do NOT navigate away — stay on page so user can continue editing
    } catch (error) {
      console.error('Error updating note', error);
      toast.error('Failed to update Notice!');
      navigate('/'); // keep previous behaviour: go back to board on critical error
    } finally {
      setSaving(false); // always stop the saving indicator
    }
  };

  // --- Loading UI (early return) ---
  // While the page is fetching the note, show a centered loader.
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        {/* LoaderIcon + label — uses theme classes so synthwave controls colors */}
        <div className="card bg-base-100 border border-base-300/30 shadow-md p-6 flex items-center gap-4">
          <LoaderIcon className="h-6 w-6 animate-spin" aria-hidden="true" />
          <div>
            <div className="font-medium">Loading notice...</div>
            <div className="text-xs opacity-60">Retrieving data from the server</div>
          </div>
        </div>
      </div>
    );
  }

  // At this point loading is false. The original code navigates to "/" on fetch error,
  // so `note` should be present here. We still guard with optional chaining.
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Top bar: Back link and Delete action */}
          <div className="flex items-center justify-between mb-6">
            {/* Back link - uses Link so navigation is client-side */}
            <Link to="/" className="btn btn-ghost inline-flex items-center gap-2">
              {/* Proper icon sizing with Tailwind utils */}
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to Notice Board</span>
            </Link>

            {/* Delete button */}
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline inline-flex items-center gap-2"
              aria-label="Delete notice"
            >
              <Trash2Icon className="h-5 w-5" />
              <span>Delete Notice</span>
            </button>
          </div>

          {/* Card that contains the editable fields */}
          <div className="card bg-base-100 border border-base-300/30 shadow-md rounded-xl overflow-hidden">
            <div className="card-body p-6">
              {/* Title input field */}
              <div className="form-control mb-4 flex flex-col gap-2 w-full">
                {/* Label connected to the input via htmlFor/id (accessibility) */}
                <label htmlFor="note-title" className="label">
                  <span className="label-text font-medium">Title</span>
                </label>

                {/* Controlled input: value comes from `note.title` and onChange updates state */}
                <input
                  id="note-title"
                  type="text"
                  placeholder="Notice Title"
                  className="input input-bordered w-full"
                  value={note?.title ?? ''}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  aria-label="Notice title"
                />
              </div>

              {/* Content textarea field */}
              <div className="form-control mb-4 flex flex-col gap-2 w-full">
                <label htmlFor="note-content" className="label">
                  <span className="label-text font-medium">Content</span>
                </label>

                {/* Controlled textarea */}
                <textarea
                  id="note-content"
                  placeholder="Notice Content"
                  className="textarea textarea-bordered h-40 w-full resize-vertical"
                  value={note?.content ?? ''}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                  aria-label="Notice content"
                />
              </div>

              {/* Action buttons: Save */}
              <div className="card-actions justify-end">
                {/* Save button shows a spinner and text while saving */}
                <button
                  onClick={handleSave}
                  className={`btn btn-primary inline-flex items-center gap-2 ${saving ? 'loading' : ''}`}
                  disabled={saving}
                  aria-disabled={saving}
                >
                  {saving ? (
                    // When saving, show loader icon + text (keeps behaviour consistent)
                    <>
                      <LoaderIcon className="h-4 w-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    // Default button label
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Helpful hint below the card */}
          <div className="mt-4 text-sm opacity-70">
            Tip: Changes are saved to the server. Use the &quot;Delete Notice&quot; button to remove the notice.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
