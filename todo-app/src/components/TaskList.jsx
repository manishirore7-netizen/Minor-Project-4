import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

/**
 * TaskList Component
 * Displays the list of filtered tasks or an appropriate empty state.
 */
function TaskList({
  tasks,
  totalTasksCount,
  currentFilter,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}) {
  // Render appropriate empty state message
  const renderEmptyState = () => {
    // When the whole app has zero tasks
    if (totalTasksCount === 0) {
      return <EmptyState />;
    }

    // When tasks exist but none match the active filter
    if (currentFilter === 'completed') {
      return (
        <EmptyState
          title="No completed tasks yet"
          description="You haven't marked any tasks as completed. Check off an item in your list to see it here."
        />
      );
    }

    if (currentFilter === 'pending') {
      return (
        <EmptyState
          title="No pending tasks"
          description="All of your tasks are currently marked as completed. Great job getting things done!"
        />
      );
    }

    return <EmptyState />;
  };

  return (
    <section className="task-list-section" aria-label="Task list">
      <div className="task-list-header">
        <h2 className="task-list-title">
          Task Overview
          <span className="task-count-pill">{tasks.length}</span>
        </h2>
        <span className="task-list-hint">Click checkbox to update status</span>
      </div>

      {tasks.length === 0 ? (
        renderEmptyState()
      ) : (
        <ul className="task-items-list" aria-label="Tasks">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleTask={onToggleTask}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
