import css from './SearchForm.module.css';

export default function SearchForm({ handleSubmit }) {
  function getSearchData(e) {
    e.preventDefault();
    const params = e.target.elements.search.value.trim();
    handleSubmit(params);
    e.target.reset();
  }

  return (
    <form className={css.search} onSubmit={getSearchData}>
      <input type="text" name="search" className={css.searchInput} required />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}
