/**
 * CategoryNav Component
 * Displays category navigation tabs: All Notes, Personal, Work, Study, and Ideas
 * with real-time dynamic note counts.
 */
function CategoryNav({ selectedCategory, onSelectCategory, counts = {} }) {
  const categories = [
    { id: 'all', label: 'All Notes', count: counts.all ?? 0 },
    { id: 'personal', label: 'Personal', count: counts.personal ?? 0 },
    { id: 'work', label: 'Work', count: counts.work ?? 0 },
    { id: 'study', label: 'Study', count: counts.study ?? 0 },
    { id: 'ideas', label: 'Ideas', count: counts.ideas ?? 0 },
  ];

  return (
    <nav className="category-nav" aria-label="Notes categories">
      <ul className="category-list">
        {categories.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.id;
          return (
            <li key={cat.id}>
              <button
                type="button"
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                aria-pressed={isActive}
              >
                <span className="category-label">{cat.label}</span>
                <span className={`category-count ${isActive ? 'count-active' : ''}`}>
                  {cat.count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CategoryNav;
