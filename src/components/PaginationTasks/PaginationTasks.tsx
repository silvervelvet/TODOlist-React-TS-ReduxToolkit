import styles from './PaginationTasks.module.css';

import icon_btn_next from './img/icon_btn_next.png';
import icon_btn_prev from './img/icon_btn_prev.png';

const PaginationTasks = () => {
  return (
    <div className={styles.pagination_container}>
      <button className={styles.pagination_btn_container}>
        <img className={styles.icon_btn} src={icon_btn_prev} alt="Previous" />
      </button>
      <button className={styles.num_btn}>1</button>
      <button className={styles.pagination_btn_container}>
        <img className={styles.icon_btn} src={icon_btn_next} alt="Next" />
      </button>
    </div>
  );
};

export default PaginationTasks;
