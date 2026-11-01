/**
 * TaskFilter Component
 * Navigation tabs to filter tasks by 'all', 'pending', or 'completed'.
 */
function TaskFilter({ currentFilter, onFilterChange, counts }) {
  const filters = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <nav className="task-filter-nav" aria-label="Task filters">
      <div className="filter-group">
        {filters.map((filter) => {
          const isActive = currentFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              className={`filter-btn ${isActive ? 'active' : ''}`}
              onClick={() => onFilterChange(filter.id)}
              aria-pressed={isActive}
            >
              <span className="filter-label">{filter.label}</span>
              <span className={`filter-badge ${isActive ? 'badge-active' : ''}`}>
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default TaskFilter;
