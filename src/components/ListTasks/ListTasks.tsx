import { useEffect, useState } from 'react';
import { useGetTodosQuery } from '../../services/todoApi';
import Tabs from '../Tabs';
import Task from '../Task';
import styles from './ListTasks.module.css';
import PaginationTasks from '../PaginationTasks';
import { useSearchContext } from '../../context/SearchContext';

const ListTasks: React.FC = () => {
  const { data: todos = [], error, isLoading } = useGetTodosQuery();
  const [activeTab, setActiveTab] = useState<
    'all' | 'completed' | 'pending' | 'favourites'
  >('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { query } = useSearchContext();

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    const savedTab = localStorage.getItem('activeTab');

    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
    if (savedTab) {
      setActiveTab(savedTab as 'all' | 'completed' | 'pending' | 'favourites');
    }

    console.log(
      'Restored from localStorage - Page:',
      savedPage,
      'Tab:',
      savedTab
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('currentPage', String(currentPage));
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tasks</div>;
  }

  console.log('Todos data:', todos);

  const filteredTodos = todos
    .filter((todo) => {
      console.log('Checking Todo:', todo);
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
    .filter((todo) => {
      return todo.description.toLowerCase().includes(query.toLowerCase());
    });

  console.log('Filtered Todos Length:', filteredTodos.length);

  const tasksPerPage = 3;
  const totalPages = Math.ceil(filteredTodos.length / tasksPerPage);

  console.log('Total Pages:', totalPages);

  // useEffect(() => {
  //   if (currentPage > totalPages && totalPages > 0) {
  //     setCurrentPage(totalPages);
  //   }
  // }, [totalPages]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTodos.slice(indexOfFirstTask, indexOfLastTask);

  console.log('Current Page:', currentPage);
  console.log('Tasks on this page:', currentTasks);

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
