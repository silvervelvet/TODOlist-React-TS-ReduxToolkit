import PaginationTasks from '../PaginationTasks';
import Task from '../Task';
import styles from './ListTasks.module.css';

const ListTasks = () => {
  return (
    <section>
      <ul>
        <Task />
      </ul>
      <PaginationTasks />
    </section>
  );
};

export default ListTasks;
