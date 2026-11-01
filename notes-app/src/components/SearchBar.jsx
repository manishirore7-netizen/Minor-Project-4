/**
 * SearchBar Component
 * Real-time search input for notes with a clear (X) button.
 */
function SearchBar({ searchQuery, onSearchChange, onClearSearch }) {
  return (
    <div className="search-section" role="search">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="search"
          className="search-input"
          placeholder="Search your notes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search notes"
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={onClearSearch}
            aria-label="Clear search"
            title="Clear search"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
