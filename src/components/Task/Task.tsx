import styles from './Task.module.css';
import icon_favourite from './img/icon_favourite.png';
import icon_nofavourite_lightTheme from './img/icon_nofavourite.png';
import icon_nofavourite_darkTheme from './img/icon_nofavourite_darkTheme.png';
import icon_done from './img/icon_done.png';
import icon_nodone from './img/icon_nodone.png';
import icon_delete_lightTheme from './img/icon_delete.png';
import icon_delete_darkTheme from './img/icon_delete_darkTheme.png'
import {
  TaskType,
  useDeleteTodoMutation,
  useUpdateTodoStatusMutation,
  useUpdateTodoFavouriteMutation,
} from '../../services/todoApi';
import { useTheme } from '../../context/ThemeContext';

interface TaskProps {
  todo: TaskType;
}

const Task: React.FC<TaskProps> = ({ todo }) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodoStatus] = useUpdateTodoStatusMutation();
  const [updateTodoFavourite] = useUpdateTodoFavouriteMutation();

  const { theme } = useTheme();

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id).unwrap();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async () => {
    const newStatus = todo.status === 'todo' ? 'isDone' : 'todo';
    try {
      await updateTodoStatus({ id: todo.id, status: newStatus }).unwrap();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleFavouriteToggle = async () => {
    try {
      await updateTodoFavourite({
        id: todo.id,
        isFavourites: !todo.isFavourites,
      }).unwrap();
    } catch (error) {
      console.error('Error updating task favourite status:', error);
    }
  };

  const toggleTaskDescriptionClass =
    todo.status === 'isDone' && styles.task_description_done;

  const doneIconSrc = todo.status === 'isDone' ? icon_done : icon_nodone;

  const toggleIsFavouritesIconSrc =
    todo.isFavourites === false ? `${theme === 'light' ? icon_nofavourite_lightTheme : icon_nofavourite_darkTheme}` : icon_favourite;

  return (
    <div
      className={`${styles.task_container} ${
        theme === 'light'
          ? styles.task_container_lightTheme
          : styles.task_container_darkTheme
      }`}
    >
      <button
        className={styles.btn_favorite_container}
        onClick={handleFavouriteToggle}
      >
        <img
          className={styles.btn_favorite_icon}
          src={toggleIsFavouritesIconSrc}
          alt="icon_favourite_status"
        />
      </button>
      <div
        className={`${styles.task_description} ${toggleTaskDescriptionClass} ${theme === 'light'
        ? styles.task_description_lightTheme
        : styles.task_description_darkTheme}`}
      >
        {todo.description}
      </div>
      <div className={styles.btn_container} onClick={handleStatusChange}>
        <button className={styles.btn}>
          <img
            className={styles.btn_icon}
            src={doneIconSrc}
            alt="icon_status"
          />
        </button>
        <button className={styles.btn} onClick={handleDelete}>
          <img
            className={styles.btn_icon}
            src={`${theme === 'light' ? icon_delete_lightTheme : icon_delete_darkTheme}`}
            alt="icon_delete"
          />
        </button>
      </div>
    </div>
  );
};

export default Task;
