import styles from './ThemeToogle.module.css';

import icon_lightTheme from './img/icon_lightTheme.png';
const ThemeToggleBtn = () => {
  return (
    <button className={styles.btn_toggle_container}>
      <img src={icon_lightTheme} alt="icon_lightTheme" />
    </button>
  );
};

export default ThemeToggleBtn;
