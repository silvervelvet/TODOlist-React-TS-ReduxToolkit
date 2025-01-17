import styles from './Task.module.css';
import icon_favourite from './img/icon_favourite.png';
import icon_done from './img/icon_done.png';
import icon_delete from './img/icon_delete.png';
import { TaskType, useDeleteTodoMutation } from '../../services/todoApi';

interface TaskProps {
  todo:TaskType
}

const Task: React.FC<TaskProps> = ({ todo }) => {
  const [deleteTodo] = useDeleteTodoMutation();

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id).unwrap();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className={styles.task_container}>
      <button className={styles.btn_favorite_container}>
        <img
          className={styles.btn_favorite_icon}
          src={icon_favourite}
          alt="icon_favourite"
        />
      </button>
      <div className={styles.task_description}>
        {todo.description}
      </div>
      <div className={styles.btn_container}>
        <button className={styles.btn}>
          <img className={styles.btn_icon} src={icon_done} alt="icon_done" />
        </button>
        <button className={styles.btn} onClick={handleDelete}>
          <img
            className={styles.btn_icon}
            src={icon_delete}
            alt="icon_delete"
          />
        </button>
      </div>
    </div>
  );
};

export default Task;
