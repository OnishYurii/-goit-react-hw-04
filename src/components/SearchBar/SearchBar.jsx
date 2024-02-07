import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = ev => {
    ev.preventDefault();
    if (ev.target.elements.query.value.trim() === '') {
      toast('Empty String', {
        icon: '🤪',
        style: {
          backgroundColor: '#e91111',
          borderRadius: '20px',
          color: '#fff',
        },
      });
      return;
    }
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
