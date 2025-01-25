import { useState } from 'react';
import { useGetTodosQuery } from '../../services/todoApi';
import Tabs from '../Tabs';
import Task from '../Task';
import styles from './ListTasks.module.css';

const ListTasks: React.FC = () => {
  const { data: todos = [], error, isLoading } = useGetTodosQuery();
  const [activeTab, setActiveTab] = useState<
    'all' | 'completed' | 'pending' | 'favourites'
  >('all');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tasks</div>;
  }

  const filteredTodos = todos.filter((todo) => {
    switch (activeTab) {
      case 'completed':
        return todo.status === 'isDone';
      case 'pending':
        return todo.status === 'isActive';
      case 'favourites':
        return todo.isFavourites === true;
      default:
        return true;
    }
  });

  return (
    <section className={styles.list_tasks_container}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => <Task key={todo.id} todo={todo} />)
      ) : (
        <p>No tasks available</p>
      )}
    </section>
  );
};

export default ListTasks;
