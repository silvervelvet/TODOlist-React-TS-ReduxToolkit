import { useEffect, useState } from 'react';
import { useGetTodosQuery } from '../../services/todoApi';
import Tabs from '../Tabs';
import Task from '../Task';
import styles from './ListTasks.module.css';
import PaginationTasks from '../PaginationTasks';
import { useSearchContext } from '../../context/SearchContext';

const ListTasks: React.FC = () => {
  const { data: todosData = [], error: todosError, isLoading: todosLoading } = useGetTodosQuery();
  const { query } = useSearchContext();

  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending' | 'favourites'>(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab && ['all', 'completed', 'pending', 'favourites'].includes(savedTab)
      ? (savedTab as 'all' | 'completed' | 'pending' | 'favourites')
      : 'all';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const [currentPage, setCurrentPage] = useState<number>(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage) : 1;
  });

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  const filteredTodos = todosData
    .filter((todo) => {
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
    })
    .filter((todo) => todo.description.toLowerCase().includes(query.toLowerCase()));

  const tasksPerPage = 3;
  const totalPages = Math.ceil(filteredTodos.length / tasksPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

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

  if (todosLoading) {
    return <div>Loading...</div>;
  }

  if (todosError) {
    return <div>Error loading tasks</div>;
  }

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
