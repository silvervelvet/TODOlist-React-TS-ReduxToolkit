import ListTasks from '../../components/ListTasks';
import NewTask from '../../components/NewTask';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <NewTask />
      <ListTasks />
    </main>
  );
};

export default HomePage;
