import NoteCard from './NoteCard';
import EmptyState from './EmptyState';

/**
 * NoteGrid Component
 * Renders a responsive grid of NoteCards or an appropriate EmptyState
 * (distinguishing between an empty app, no search results, or empty category).
 */
function NoteGrid({ notes, totalNotesCount = 0, searchQuery = '', onSelectNote, onTogglePin, onChangeColor }) {
  if (!notes || notes.length === 0) {
    if (totalNotesCount === 0) {
      return <EmptyState />;
    }

    if (searchQuery && searchQuery.trim()) {
      return (
        <EmptyState
          title="No notes found"
          description={`No notes match "${searchQuery}". Try searching with a different keyword.`}
        />
      );
    }

    return (
      <EmptyState
        title="No notes in this category"
        description="You have no notes in this category yet. Click 'New Note' to create one."
      />
    );
  }

  return (
    <section className="notes-grid-section" aria-label="Notes collection">
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onSelectNote={onSelectNote}
            onTogglePin={onTogglePin}
            onChangeColor={onChangeColor}
          />
        ))}
      </div>
    </section>
  );
}

export default NoteGrid;
