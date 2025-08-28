import Navbar from '../components/Navbar.jsx'           // Top navigation bar component
import { useEffect, useState } from 'react';          // React hooks for state & lifecycle
import api from '../lib/axios.js';                    // Axios instance pre-configured for your API
import toast from 'react-hot-toast';                  // Small toast notifications for success/errors
import NoteCard from '../components/NoteCard.jsx';    // Component that renders a single notice card
import { NotebookIcon } from 'lucide-react';         // Small icon used in the empty state

// HomePage component: shows the list of notices (the "notice board")
const HomePage = () => {
  // `notices` stores the list of notices fetched from the server
  // `setNotices` is the function we call to update `notices`
  const [notices, setNotices] = useState([])

  // `loading` is true while we are fetching data from the server.
  // Start true so the UI shows the loading state on first render.
  const [loading, setLoading] = useState(true);

  // useEffect runs after the component first renders.
  // We use it here to fetch the notices from the API.
  useEffect(() => {
    // Define an async function inside useEffect because useEffect itself can't be async
    const fetchNotices = async () => {
      try {
        // Call GET /notes on your API
        const response = await api.get('/notes');

        // Put the returned data into React state so the UI updates
        setNotices(response.data);
      } catch (error) {
        // If the request fails, log to console (for dev) and show a toast to the user
        console.log('Failed to fetch notices:', error);
        toast.error('Failed to fetch notices');
      } finally {
        // Whether success or failure, stop the loading indicator
        setLoading(false);
      }
    };

    // Call the async function we defined
    fetchNotices();

    // Empty dependency array [] means this effect runs only once (on mount)
  }, []);

  // Create an array of six items to render skeleton placeholders while loading.
  // We don't care about the values — we only want the correct length for mapping.
  const skeletons = Array.from({ length: 6 });

  // The component's JSX (what gets rendered)
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* Navbar at the top. This is a separate component for reusability */}
      <Navbar />
      {/* Main content wrapper with max width and paddings for good layout on different screens */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Content area. aria-live politely tells screen readers that the content may change */}
        <section aria-live="polite">
          {/* Loading state: show skeleton cards while data is being fetched */}
          {loading && (
            // Grid layout that becomes 1/2/3 columns depending on screen width
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skeletons.map((_, i) => (
                // Each skeleton card mimics the real NoteCard's shape.
                // animate-pulse gives the pulsing loading effect.
                <div
                  key={i}
                  className="card bg-base-100 border border-base-300/30 rounded-xl shadow-sm overflow-hidden animate-pulse"
                  aria-hidden="true" // decorative-only: hide it from assistive tech
                >
                  <div className="p-5">
                    {/* These empty divs are placeholders for title, lines, and footer */}
                    <div className="h-6 bg-base-300/40 rounded w-3/4 mb-4" />
                    <div className="h-3 bg-base-300/30 rounded w-full mb-2" />
                    <div className="h-3 bg-base-300/30 rounded w-5/6 mb-2" />
                    <div className="h-10 bg-base-300/20 rounded mt-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show notices grid when we have data and we're not loading */}
          {!loading && notices.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.map((notice) => (
                // For each notice from the server, render a NoteCard.
                // Key must be unique (use the notice id) so React can track items efficiently.
                // We also pass setNotices so NoteCard can update the list if it supports deletion or edits.
                <NoteCard key={notice._id} note={notice} setNotes={setNotices} />
              ))}
            </div>
          )}

          {/* Empty state: shown when loading is done and there are no notices */}
          {!loading && notices.length === 0 && (
            <div className="card bg-base-100 border border-base-300/30 rounded-xl shadow-sm p-8 text-center">
              {/* Icon to visually emphasize the empty state */}
              <NotebookIcon className="size-12 mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">No notices yet</h2>
              <p className="opacity-70 mb-4">There aren't any notices to show right now. Create one to get started.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default HomePage
