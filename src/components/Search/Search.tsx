import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';
import styles from './Search.module.css';

import icon_search from './img/icon_search.png';
import { useSearchContext } from '../../context/SearchContext';
import { debounce } from 'lodash';

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { setQuery } = useSearchContext();
  const { theme } = useTheme();

  const debounceSetQuery = debounce((query: string) => {
    setQuery(query);
  }, 3000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debounceSetQuery(value);
  };

  return (
    <div className={styles.search_container}>
      <input
        className={`${styles.input_group} ${theme === 'light' ? styles.input_group_lightTheme : styles.input_group_darkTheme}`}
        type="text"
        placeholder="Search tasks..."
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      <div className={styles.search_icon_container}>
        <img src={icon_search} className={styles.search_icon} />
      </div>
    </div>
  );
};

export default Search;
