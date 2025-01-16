import Task from '../Task';
import styles from './ListTasks.module.css';

const ListTasks = () => {
  return (
    <section className={styles.list_tasks_container}>
      <Task />
    </section>
  );
};

export default ListTasks;
