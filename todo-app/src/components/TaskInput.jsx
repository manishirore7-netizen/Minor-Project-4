import { useState } from 'react';

/**
 * TaskInput Component
 * Allows users to type a task description, optionally choose a due date,
 * and submit it to the task list.
 */
function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = taskText.trim();
    if (!trimmed) return;

    if (onAddTask) {
      onAddTask(trimmed, dueDate);
    }
    setTaskText('');
    setDueDate('');
  };

  return (
    <section className="task-input-section" aria-label="Add new task">
      <form className="task-input-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <span className="input-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </span>
          <input
            id="new-task-input"
            type="text"
            className="task-text-input"
            placeholder="Add a new task (e.g., Buy groceries, Read a book)..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            aria-label="New task title"
          />
        </div>

        <div className="date-input-group">
          <input
            id="new-task-due-date"
            type="date"
            className="task-date-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="Due date (optional)"
            title="Due date (optional)"
          />
        </div>

        <button
          type="submit"
          className="add-task-btn"
          disabled={!taskText.trim()}
          aria-label="Add task"
        >
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Task</span>
        </button>
      </form>
    </section>
  );
}

export default TaskInput;
