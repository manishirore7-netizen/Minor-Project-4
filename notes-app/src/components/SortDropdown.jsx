/**
 * SortDropdown Component
 * Compact sorting dropdown for ordering notes by update time or title.
 */
function SortDropdown({ sortBy, onSortChange }) {
  return (
    <div className="sort-dropdown-container">
      <label htmlFor="notes-sort" className="sort-label">
        <svg
          className="sort-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h18M6 12h12M10 18h4" />
        </svg>
        <span className="sort-label-text">Sort:</span>
      </label>
      <div className="sort-select-wrapper">
        <select
          id="notes-sort"
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort notes"
        >
          <option value="recent">Recently Updated</option>
          <option value="oldest">Oldest Updated</option>
          <option value="title-asc">Title (A–Z)</option>
          <option value="title-desc">Title (Z–A)</option>
        </select>
        <span className="sort-chevron" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default SortDropdown;
