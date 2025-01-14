import styles from './Tabs.module.css';

const Tabs = () => {
  return (
    <div className={styles.tabs_container}>
      <button className={styles.tab}>
        All
      </button>
      <button className={styles.tab}>
        Completed
      </button>
      <button className={styles.tab}>
        Pending
      </button>
      <button className={styles.tab}>
        Favourites
      </button>
    </div>
  );
};

export default Tabs;
