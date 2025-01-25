import { useState } from 'react';
import { useGetTodosQuery } from '../../services/todoApi';
import Tabs from '../Tabs';
import Task from '../Task';
import styles from './ListTasks.module.css';
import PaginationTasks from '../PaginationTasks';

const ListTasks: React.FC = () => {
  const { data: todos = [], error, isLoading } = useGetTodosQuery();
  const [activeTab, setActiveTab] = useState<
    'all' | 'completed' | 'pending' | 'favourites'
  >('all');
  const [currentPage, setCurrentPage] = useState(1);

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

  const tasksPerPage = 3;
  const totalPages = Math.ceil(filteredTodos.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTodos.slice(indexOfFirstTask, indexOfLastTask);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className={styles.list_tasks_container}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {currentTasks.length > 0 ? (
        currentTasks.map((todo) => <Task key={todo.id} todo={todo} />)
      ) : (
        <p>No tasks available</p>
      )}
      {filteredTodos.length > 3 && (
        <PaginationTasks
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={nextPage}
          onPrev={prevPage}
          goToPage={goToPage}
        />
      )}
    </section>
  );
};

export default ListTasks;
