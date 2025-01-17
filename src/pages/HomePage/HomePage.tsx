import ListTasks from '../../components/ListTasks';
import NewTask from '../../components/NewTask';
import PaginationTasks from '../../components/PaginationTasks';
import Tabs from '../../components/Tabs';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <NewTask />
      <div className={styles.tabs_list_tasks_container}>
        <Tabs />
        <ListTasks />
      </div>
      <PaginationTasks />
    </main>
  );
};

export default HomePage;
