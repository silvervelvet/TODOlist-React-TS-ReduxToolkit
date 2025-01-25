import styles from './PaginationTasks.module.css';

import icon_btn_next from './img/icon_btn_next.png';
import icon_btn_prev from './img/icon_btn_prev.png';

interface PaginationTasksProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  goToPage: (page: number) => void;
}

const PaginationTasks: React.FC<PaginationTasksProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  goToPage,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.pagination_container}>
      <button
        className={styles.pagination_btn_container}
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        <img className={styles.icon_btn} src={icon_btn_prev} alt="Previous" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.num_btn} ${currentPage === page ? styles.active : ''}`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}{' '}
      <button
        className={styles.pagination_btn_container}
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        <img className={styles.icon_btn} src={icon_btn_next} alt="Next" />
      </button>
    </div>
  );
};

export default PaginationTasks;
