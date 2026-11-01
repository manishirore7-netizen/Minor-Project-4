import { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskSummary from './components/TaskSummary';
import TaskInput from './components/TaskInput';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import './App.css';

// Key used to persist tasks in browser localStorage
const STORAGE_KEY = 'taskflow-tasks';

/**
 * Main App Component
 * Manages core task state, filter state, and localStorage persistence.
 */
function App() {
  // Initialize tasks from localStorage or default to an empty array
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        const parsed = JSON.parse(savedTasks);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
    }
    return [];
  });

  // Synchronize tasks to localStorage whenever tasks state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }, [tasks]);

  // Active filter state ('all' | 'pending' | 'completed')
  const [currentFilter, setCurrentFilter] = useState('all');

  // Dynamic counts for all tasks across the application
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Derive visible tasks using JavaScript filter method
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  /**
   * Add a new task to the list (with optional due date)
   */
  const handleAddTask = (title, dueDate = '') => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      dueDate: dueDate || '',
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  /**
   * Toggle task completion status
   */
  const handleToggleTask = (taskId) => {
    // Locate target task using Array.prototype.find
    const targetTask = tasks.find((task) => task.id === taskId);
    if (!targetTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Update the title and due date of an existing task
   */
  const handleEditTask = (taskId, updatedTitle, updatedDueDate = '') => {
    // Locate target task using Array.prototype.find
    const targetTask = tasks.find((task) => task.id === taskId);
    if (!targetTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, title: updatedTitle, dueDate: updatedDueDate }
          : task
      )
    );
  };

  /**
   * Remove a task from the list
   */
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="app-layout">
      <main className="dashboard-container">
        {/* App Header with branding */}
        <Header />

        {/* Dynamic Task Summary: Total, Completed, Pending & Progress */}
        <TaskSummary
          total={totalTasks}
          completed={completedTasks}
          pending={pendingTasks}
        />

        {/* Task Input: Add task form */}
        <TaskInput onAddTask={handleAddTask} />

        {/* Task Filter Navigation (All, Pending, Completed) */}
        <TaskFilter
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          counts={{
            all: totalTasks,
            pending: pendingTasks,
            completed: completedTasks,
          }}
        />

        {/* Task List: Displays filtered tasks and appropriate empty state */}
        <TaskList
          tasks={filteredTasks}
          totalTasksCount={totalTasks}
          currentFilter={currentFilter}
          onToggleTask={handleToggleTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />

        {/* Footer */}
        <footer className="dashboard-footer">
          <p>TaskFlow • Everyday Personal Task Manager</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
