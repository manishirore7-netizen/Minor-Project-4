import { useState, useRef, useEffect } from 'react';
import { NOTE_COLORS } from '../constants';

/**
 * NoteCard Component
 * Displays an individual note card with title, content preview, pastel category tag, updated date,
 * color customization popover, and pin toggle.
 * Clicking the card opens the note details modal.
 */
function NoteCard({ note, onSelectNote, onTogglePin, onChangeColor }) {
  const [showPalette, setShowPalette] = useState(false);
  const paletteRef = useRef(null);

  const isPinned = Boolean(note.isPinned);
  const noteColor = note.color || 'cream';

  // Close color palette on click outside
  useEffect(() => {
    if (!showPalette) return;
    const handleOutsideClick = (e) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target)) {
        setShowPalette(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [showPalette]);

  // Map category to CSS class for pastel color styling
  const categoryClass = note.category
    ? `category-${note.category.toLowerCase()}`
    : 'category-default';

  const handleClick = () => {
    if (onSelectNote) {
      onSelectNote(note.id);
    }
  };

  const handleKeyDown = (e) => {
    // If the event originated inside action buttons, let them handle it
    if (
      e.target.closest &&
      (e.target.closest('.note-pin-btn') ||
        e.target.closest('.note-color-btn') ||
        e.target.closest('.color-palette-popover'))
    ) {
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handlePinClick = (e) => {
    e.stopPropagation();
    if (onTogglePin) {
      onTogglePin(note.id);
    }
  };

  return (
    <article
      className={`note-card note-color-${noteColor} ${isPinned ? 'is-pinned' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${isPinned ? 'Pinned note: ' : 'Note: '}${note.title}`}
    >
      <div className="note-card-header">
        <span className={`note-category-tag ${categoryClass}`}>
          {note.category}
        </span>
        <div className="note-card-header-actions" ref={paletteRef}>
          <time className="note-date">{note.updatedAt}</time>

          {/* Color Customization Button & Popover */}
          <div className="note-color-wrapper">
            <button
              type="button"
              className={`note-action-btn note-color-btn ${showPalette ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowPalette((prev) => !prev);
              }}
              aria-label="Customize note color"
              title="Customize color"
              aria-expanded={showPalette}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="action-icon"
                aria-hidden="true"
              >
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
              </svg>
            </button>

            {showPalette && (
              <div
                className="color-palette-popover"
                role="menu"
                aria-label="Color options"
                onClick={(e) => e.stopPropagation()}
              >
                {NOTE_COLORS.map((c) => {
                  const isSelected = noteColor === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`color-swatch-option ${isSelected ? 'selected' : ''}`}
                      style={{ backgroundColor: c.bg, borderColor: c.border }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onChangeColor) {
                          onChangeColor(note.id, c.id);
                        }
                        setShowPalette(false);
                      }}
                      title={c.label}
                      aria-label={`Change color to ${c.label}`}
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
            )}
          </div>

          {/* Pin Button */}
          <button
            type="button"
            className={`note-action-btn note-pin-btn ${isPinned ? 'active' : ''}`}
            onClick={handlePinClick}
            aria-label={isPinned ? 'Unpin note' : 'Pin note'}
            title={isPinned ? 'Unpin note' : 'Pin note'}
            aria-pressed={isPinned}
          >
            <svg
              viewBox="0 0 24 24"
              fill={isPinned ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pin-icon"
              aria-hidden="true"
            >
              <line x1="12" y1="17" x2="12" y2="22" />
              <path d="M5 17h14v-2l-2-2V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v8l-2 2v2z" />
            </svg>
          </button>
        </div>
      </div>

      <h3 className="note-title">{note.title}</h3>
      <p className="note-preview">{note.content}</p>
    </article>
  );
}

export default NoteCard;
