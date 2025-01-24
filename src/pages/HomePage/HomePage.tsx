import ListTasks from '../../components/ListTasks';
import NewTask from '../../components/NewTask';
import PaginationTasks from '../../components/PaginationTasks';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <NewTask />
      <ListTasks />
      <PaginationTasks />
    </main>
  );
};

export default HomePage;
