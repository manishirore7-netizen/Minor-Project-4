/**
 * Header Component
 * Displays the application branding, logo/icon, title, and subtitle.
 */
function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-icon-wrapper" aria-hidden="true">
          <svg
            className="header-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <div className="header-text">
          <h1 className="app-title">TaskFlow</h1>
          <p className="app-subtitle">Stay organized, get things done.</p>
        </div>
      </div>
      <div className="header-badge">
        <span className="badge-dot"></span>
        <span>Daily Workspace</span>
      </div>
    </header>
  );
}

export default Header;
