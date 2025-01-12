import Search from '../Search';
import styles from './Header.module.css';
import logo from './img/logo.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo_container}>
        <svg className={styles.circle} viewBox="0 0 100 100">
          <path id="circle" d="M 0,50 a 50,50 0 1,1 0,1 z" />
          <text>
            <textPath xlinkHref="#circle">plan *** task *** done</textPath>
          </text>
        </svg>
        <div className={styles.logo_img_container}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <Search />
    </header>
  );
};

export default Header;
