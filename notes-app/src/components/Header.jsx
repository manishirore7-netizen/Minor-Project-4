/**
 * Header Component
 * Displays the Notely branding, tagline, and prominent New Note action button.
 */
function Header({ onNewNote }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon-wrapper" aria-hidden="true">
          <svg
            className="brand-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="M9 14h6" />
            <path d="M9 18h4" />
            <path d="M9 10h6" />
          </svg>
        </div>
        <div className="brand-text">
          <h1 className="app-title">Notely</h1>
          <p className="app-subtitle">Your thoughts, organized.</p>
        </div>
      </div>

      <button
        type="button"
        className="new-note-btn"
        onClick={onNewNote}
        aria-label="Create new note"
      >
        <svg
          className="btn-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span>New Note</span>
      </button>
    </header>
  );
}

export default Header;
