import { useGetTodosQuery } from '../../services/todoApi';
import Task from '../Task';
import styles from './ListTasks.module.css';

const ListTasks: React.FC = () => {
  const { data: todos = [], error, isLoading } = useGetTodosQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tasks</div>;
  }

  return (
    <section className={styles.list_tasks_container}>
      {todos.length > 0 ? (
        todos.map((todo) => <Task key={todo.id} todo={todo} />)
      ) : (
        <p>No tasks available</p>
      )}
    </section>
  );
};

export default ListTasks;
