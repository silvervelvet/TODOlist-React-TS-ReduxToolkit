import styles from './Search.module.css';

import icon_search from './img/icon_search.png';

const Search = () => {
  return (
    <form className={styles.form_container}>
      <input
        className={styles.input_group}
        type="text"
        placeholder="Search tasks..."
      ></input>
      <button type="submit" className={styles.search_btn_container}>
        <img src={icon_search} className={styles.search_btn_icon} />
      </button>
    </form>
  );
};

export default Search;
