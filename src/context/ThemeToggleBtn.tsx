import { useTheme } from './ThemeContext';
import styles from './ThemeToogle.module.css';

import icon_lightTheme from './img/icon_lightTheme.png';
import icon_darkTheme from './img/icon_darkTheme.png';

const ThemeToggleBtn = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.btn_toggle_container} onClick={toggleTheme}>
      <img
        src={theme === 'light' ? icon_lightTheme : icon_darkTheme}
        alt="icon_theme"
      />
    </button>
  );
};

export default ThemeToggleBtn;
