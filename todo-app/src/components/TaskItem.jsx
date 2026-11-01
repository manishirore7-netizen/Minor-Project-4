import { useState } from 'react';

/**
 * Format a YYYY-MM-DD date string into a user-friendly format (e.g. "Nov 1, 2026")
 */
function formatDueDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  if (isNaN(dateObj.getTime())) return dateStr;
  return dateObj.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Check if a task is overdue (due date is before today and task is not completed)
 */
function checkIsOverdue(dueDate, isCompleted) {
  if (!dueDate || isCompleted) return false;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  return dueDate < todayStr;
}

/**
 * TaskItem Component
 * Renders an individual task with checkbox, title, due date, status/overdue badges,
 * and options for Edit (with title and date modification) and Delete.
 */
function TaskItem({ task, onToggleTask, onEditTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const isCompleted = task.completed;
  const isOverdue = checkIsOverdue(task.dueDate, isCompleted);

  // Save changes to title and due date
  const handleSave = (e) => {
    e.preventDefault();
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) return;

    if (onEditTask) {
      onEditTask(task.id, trimmedTitle, editDueDate);
    }
    setIsEditing(false);
  };

  // Cancel editing and revert to current task values
  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDueDate(task.dueDate || '');
    setIsEditing(false);
  };

  // Keyboard shortcut: Escape cancels editing
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Editing mode view
  if (isEditing) {
    return (
      <li className="task-item is-editing">
        <form className="task-edit-form" onSubmit={handleSave}>
          <div className="task-edit-inputs">
            <input
              type="text"
              className="task-edit-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              aria-label="Edit task title"
            />
            <input
              type="date"
              className="task-edit-date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Edit due date"
              title="Edit due date (optional)"
            />
          </div>
          <div className="task-edit-actions">
            <button
              type="submit"
              className="edit-btn-save"
              disabled={!editTitle.trim()}
              title="Save changes"
            >
              Save
            </button>
            <button
              type="button"
              className="edit-btn-cancel"
              onClick={handleCancel}
              title="Cancel editing"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  // Standard display mode view
  return (
    <li
      className={`task-item ${isCompleted ? 'is-completed' : 'is-pending'} ${
        isOverdue ? 'is-overdue' : ''
      }`}
    >
      <label className="task-checkbox-container" htmlFor={`task-${task.id}`}>
        <input
          id={`task-${task.id}`}
          type="checkbox"
          className="task-native-checkbox"
          checked={isCompleted}
          onChange={() => onToggleTask && onToggleTask(task.id)}
        />
        <span className="task-custom-checkbox" aria-hidden="true">
          <svg
            className="check-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <div className="task-details">
          <span className="task-title-text">{task.title}</span>
          {task.dueDate && (
            <span
              className={`task-due-date ${isOverdue ? 'date-overdue' : ''}`}
            >
              <svg
                className="due-date-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Due {formatDueDate(task.dueDate)}</span>
            </span>
          )}
        </div>
      </label>

      <div className="task-item-right">
        <div className="task-meta">
          {isOverdue && (
            <span className="status-badge badge-overdue">Overdue</span>
          )}
          <span
            className={`status-badge ${
              isCompleted ? 'badge-completed' : 'badge-pending'
            }`}
          >
            {isCompleted ? 'Completed' : 'Pending'}
          </span>
        </div>

        <div className="task-actions">
          <button
            type="button"
            className="task-action-btn edit-action"
            onClick={() => {
              setEditTitle(task.title);
              setEditDueDate(task.dueDate || '');
              setIsEditing(true);
            }}
            aria-label={`Edit task: ${task.title}`}
            title="Edit task"
          >
            <svg
              className="action-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Edit</span>
          </button>

          <button
            type="button"
            className="task-action-btn delete-action"
            onClick={() => onDeleteTask && onDeleteTask(task.id)}
            aria-label={`Delete task: ${task.title}`}
            title="Delete task"
          >
            <svg
              className="action-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
