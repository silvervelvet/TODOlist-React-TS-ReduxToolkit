import ListTasks from '../../components/ListTasks';
import NewTask from '../../components/NewTask';
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
    </main>
  );
};

export default HomePage;
