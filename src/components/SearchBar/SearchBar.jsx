import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(ev.target.elements.query.value);
    ev.target.reset();
  };

  return (
    <header>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button type="submit">
          <svg width="15" height="15">
            <use href="/src/assets/symbol-defs.svg#icon-search"></use>
          </svg>
        </button>
      </form>
    </header>
  );
};
