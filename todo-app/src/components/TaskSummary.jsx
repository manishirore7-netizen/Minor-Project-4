/**
 * TaskSummary Component
 * Shows high-level statistics for Total, Completed, and Pending tasks.
 */
function TaskSummary({ total, completed, pending }) {
  // Calculate completion percentage safely
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="summary-section" aria-label="Task Summary">
      <div className="summary-grid">
        {/* Total Tasks Card */}
        <div className="summary-card total">
          <div className="summary-card-header">
            <span className="summary-label">Total Tasks</span>
            <span className="summary-icon total-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
          </div>
          <div className="summary-value">{total}</div>
          <p className="summary-helper">All active tasks in workflow</p>
        </div>

        {/* Completed Tasks Card */}
        <div className="summary-card completed">
          <div className="summary-card-header">
            <span className="summary-label">Completed</span>
            <span className="summary-icon completed-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </span>
          </div>
          <div className="summary-value">{completed}</div>
          <p className="summary-helper">{completionPercentage}% completion rate</p>
        </div>

        {/* Pending Tasks Card */}
        <div className="summary-card pending">
          <div className="summary-card-header">
            <span className="summary-label">Pending</span>
            <span className="summary-icon pending-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
          </div>
          <div className="summary-value">{pending}</div>
          <p className="summary-helper">{pending === 1 ? '1 item remaining' : `${pending} items remaining`}</p>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="progress-container">
        <div className="progress-info">
          <span className="progress-text">Progress Overview</span>
          <span className="progress-percentage">{completionPercentage}%</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={completionPercentage} aria-valuemin="0" aria-valuemax="100">
          <div
            className="progress-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
}

export default TaskSummary;
