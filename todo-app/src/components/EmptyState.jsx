/**
 * EmptyState Component
 * Displays a friendly message when there are no tasks in the list
 * or when no tasks match the active filter.
 */
function EmptyState({
  title = 'All caught up!',
  description = 'You have no tasks in your list. Type a new task above and click "Add Task" to begin your productivity flow.',
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon-wrapper" aria-hidden="true">
        <svg
          className="empty-state-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
    </div>
  );
}

export default EmptyState;
