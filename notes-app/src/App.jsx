import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryNav from './components/CategoryNav';
import SortDropdown from './components/SortDropdown';
import NoteGrid from './components/NoteGrid';
import NoteModal from './components/NoteModal';
import './App.css';

// Storage key used to persist notes in browser Local Storage
const STORAGE_KEY = 'notely-notes';

// Helper to extract timestamp for date-based sorting
function getNoteUpdateTime(note) {
  if (typeof note.updatedAtTimestamp === 'number') {
    return note.updatedAtTimestamp;
  }
  if (note.updatedAt) {
    const parsed = new Date(note.updatedAt).getTime();
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }
  if (typeof note.id === 'number') {
    return note.id;
  }
  return 0;
}

/**
 * Main Notely Application Component
 * Manages notes state, search filtering, category filtering, sorting, and modal dialogs.
 */
function App() {
  // Lazy initialize notes from Local Storage
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        const parsed = JSON.parse(savedNotes);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (error) {
      console.error('Failed to load notes from localStorage:', error);
    }
    return [];
  });

  // Synchronize notes state with Local Storage whenever notes array changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Failed to save notes to localStorage:', error);
    }
  }, [notes]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // Retrieve the selected note using Array.prototype.find and its unique ID
  const selectedNote = selectedNoteId
    ? notes.find((note) => note.id === selectedNoteId) || null
    : null;

  // Add new note to the collection
  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  // Update existing note by unique ID
  const handleUpdateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
  };

  // Delete note by unique ID
  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    setSelectedNoteId(null);
  };

  // Toggle pinned status of a note without modifying its content or updatedAt timestamp
  const handleTogglePinNote = (noteId) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  // Change color of a note without modifying other properties
  const handleChangeNoteColor = (noteId, newColor) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, color: newColor } : note
      )
    );
  };

  // Derive visible notes based on active category and case-insensitive search
  const filteredNotes = notes.filter((note) => {
    // Category filter
    const matchesCategory =
      selectedCategory === 'all' ||
      note.category.toLowerCase() === selectedCategory.toLowerCase();

    // Search filter across title and content
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Sort filtered notes: pinned notes first, then respect sortBy within each group
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    // 1. Pinned status takes precedence (pinned notes before unpinned notes)
    const aPinned = Boolean(a.isPinned);
    const bPinned = Boolean(b.isPinned);

    if (aPinned !== bPinned) {
      return aPinned ? -1 : 1;
    }

    // 2. Within the same pinned/unpinned group, respect the selected sort order
    switch (sortBy) {
      case 'oldest': {
        const timeDiff = getNoteUpdateTime(a) - getNoteUpdateTime(b);
        return timeDiff !== 0 ? timeDiff : (a.id || 0) - (b.id || 0);
      }
      case 'title-asc': {
        const cmp = a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
        return cmp !== 0 ? cmp : getNoteUpdateTime(b) - getNoteUpdateTime(a);
      }
      case 'title-desc': {
        const cmp = b.title.localeCompare(a.title, undefined, { sensitivity: 'base' });
        return cmp !== 0 ? cmp : getNoteUpdateTime(b) - getNoteUpdateTime(a);
      }
      case 'recent':
      default: {
        const timeDiff = getNoteUpdateTime(b) - getNoteUpdateTime(a);
        return timeDiff !== 0 ? timeDiff : (b.id || 0) - (a.id || 0);
      }
    }
  });

  // Category counts derived dynamically from the notes state
  const categoryCounts = {
    all: notes.length,
    personal: notes.filter((n) => n.category.toLowerCase() === 'personal').length,
    work: notes.filter((n) => n.category.toLowerCase() === 'work').length,
    study: notes.filter((n) => n.category.toLowerCase() === 'study').length,
    ideas: notes.filter((n) => n.category.toLowerCase() === 'ideas').length,
  };

  return (
    <div className="notely-layout">
      <main className="notely-container">
        {/* App Header with branding & New Note button */}
        <Header onNewNote={() => setIsCreateOpen(true)} />

        {/* Real-time Search Input with Clear button */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* Category Navigation & Sort Toolbar */}
        <div className="category-sort-bar">
          <CategoryNav
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            counts={categoryCounts}
          />
          <SortDropdown
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Responsive Notes Grid with Search, Category, Sort, Pin & Color integration */}
        <NoteGrid
          notes={sortedNotes}
          totalNotesCount={notes.length}
          searchQuery={searchQuery}
          onSelectNote={(noteOrId) => {
            const id = typeof noteOrId === 'object' && noteOrId !== null ? noteOrId.id : noteOrId;
            setSelectedNoteId(id);
          }}
          onTogglePin={handleTogglePinNote}
          onChangeColor={handleChangeNoteColor}
        />

        {/* Create New Note Modal */}
        {isCreateOpen && (
          <NoteModal
            isOpen={true}
            onClose={() => setIsCreateOpen(false)}
            onSaveNote={handleAddNote}
          />
        )}

        {/* View / Edit Existing Note Modal */}
        {selectedNote && (
          <NoteModal
            isOpen={true}
            note={selectedNote}
            onClose={() => setSelectedNoteId(null)}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        )}

        {/* Minimal Footer */}
        <footer className="notely-footer">
          <p>Notely • Clean, Minimal Note Taking</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
