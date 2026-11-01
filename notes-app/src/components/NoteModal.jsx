import { useState } from 'react';
import { NOTE_COLORS } from '../constants';

/**
 * NoteModal Component
 * Handles creating new notes as well as viewing, editing, and deleting existing notes.
 */
function NoteModal({
  isOpen,
  note = null,
  onClose,
  onSaveNote,
  onUpdateNote,
  onDeleteNote,
}) {
  const isExistingNote = Boolean(note);

  // Form states initialized with existing note data or defaults
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [category, setCategory] = useState(note ? note.category : 'Personal');
  const [color, setColor] = useState(note ? (note.color || 'cream') : 'cream');
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  if (!isOpen) return null;

  // Handle saving (creates new note or updates existing note)
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    const timestamp = Date.now();
    const currentDate = new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    if (isExistingNote && onUpdateNote) {
      // Update existing note with same unique ID
      onUpdateNote({
        ...note,
        title: trimmedTitle,
        content: trimmedContent,
        category,
        color,
        updatedAt: currentDate,
        updatedAtTimestamp: timestamp,
      });
      onClose();
    } else if (onSaveNote) {
      // Create a brand new note
      onSaveNote({
        id: timestamp,
        title: trimmedTitle,
        content: trimmedContent,
        category,
        color,
        updatedAt: currentDate,
        updatedAtTimestamp: timestamp,
        isPinned: false,
      });
      onClose();
    }
  };

  // Cancel handler
  const handleCancel = () => {
    if (isConfirmingDelete) {
      setIsConfirmingDelete(false);
      return;
    }

    if (isExistingNote && isEditing) {
      // Revert edits and return to view mode
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category);
      setColor(note.color || 'cream');
      setIsEditing(false);
    } else {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const categoryClass = (isExistingNote && !isEditing ? note.category : category)
    ? `category-${(isExistingNote && !isEditing ? note.category : category).toLowerCase()}`
    : 'category-default';

  return (
    <div className="modal-backdrop" onClick={handleCancel} onKeyDown={handleKeyDown}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="modal-header">
          {isExistingNote && !isEditing ? (
            <div className="note-detail-meta">
              <span className={`note-category-tag ${categoryClass}`}>
                {note.category}
              </span>
              <time className="note-date">Updated {note.updatedAt}</time>
            </div>
          ) : (
            <h2 id="modal-title" className="modal-title">
              {isExistingNote ? 'Edit Note' : 'Create New Note'}
            </h2>
          )}
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
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
        </div>

        {/* View Mode (when viewing existing note and not in edit mode) */}
        {isExistingNote && !isEditing ? (
          <div className="note-detail-view">
            <h2 id="modal-title" className="note-detail-title">
              {note.title}
            </h2>
            <div className="note-detail-content">
              {note.content}
            </div>

            <div className="modal-actions note-view-actions">
              <button
                type="button"
                className="btn-delete"
                onClick={() => setIsConfirmingDelete(true)}
                aria-label="Delete this note"
              >
                Delete
              </button>
              <div className="actions-right">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn-save"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Form Mode (Create or Edit) */
          <form onSubmit={handleSubmit} className="note-form">
            <div className="form-group">
              <label htmlFor="note-title-input" className="form-label">
                Title
              </label>
              <input
                id="note-title-input"
                type="text"
                className="form-input"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="note-category-select" className="form-label">
                Category
              </label>
              <select
                id="note-category-select"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Ideas">Ideas</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Note Color
              </label>
              <div className="modal-color-options" role="radiogroup" aria-label="Select note color">
                {NOTE_COLORS.map((c) => {
                  const isSelected = color === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`modal-color-swatch ${isSelected ? 'selected' : ''}`}
                      style={{ backgroundColor: c.bg, borderColor: c.border }}
                      onClick={() => setColor(c.id)}
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={c.label}
                      title={c.label}
                    >
                      {isSelected && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="swatch-check-icon"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="note-content-input" className="form-label">
                Content
              </label>
              <textarea
                id="note-content-input"
                className="form-textarea"
                placeholder="Write your note content here..."
                rows="6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save"
                disabled={!title.trim() || !content.trim()}
              >
                {isExistingNote ? 'Save Changes' : 'Save Note'}
              </button>
            </div>
          </form>
        )}

        {/* Delete Confirmation Dialog */}
        {isConfirmingDelete && (
          <div
            className="confirm-dialog-backdrop"
            onClick={() => setIsConfirmingDelete(false)}
          >
            <div
              className="confirm-dialog"
              onClick={(e) => e.stopPropagation()}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="confirm-delete-title"
            >
              <h3 id="confirm-delete-title" className="confirm-title">
                Are you sure you want to delete this note?
              </h3>
              <p className="confirm-description">
                This action cannot be undone. The note will be permanently removed.
              </p>
              <div className="confirm-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsConfirmingDelete(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-confirm-delete"
                  onClick={() => {
                    if (onDeleteNote && note) {
                      onDeleteNote(note.id);
                    }
                    setIsConfirmingDelete(false);
                    onClose();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteModal;
