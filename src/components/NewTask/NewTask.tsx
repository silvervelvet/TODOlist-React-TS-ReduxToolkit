import { useState } from 'react';
import { useAddTodoMutation } from '../../services/todoApi';
import styles from './NewTask.module.css';
import icon_add_lightTheme from './img/icon_add.png';
import icon_add_darkTheme from './img/icon_add_darkTheme.png';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '../../context/ThemeContext';

const NewTask: React.FC = () => {
  const [textTask, setTextTask] = useState<string>('');
  const [addTodo, { isLoading, isError }] = useAddTodoMutation();

  const { theme } = useTheme();

  const handleAddTask = async (event: React.FormEvent) => {
    event.preventDefault();

    if (textTask.trim()) {
      const newTask = {
        id: uuidv4(),
        description: textTask,
        status: 'todo' as const,
        isFavourites: false,
      };

      try {
        await addTodo(newTask).unwrap();
        setTextTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  return (
    <form className={styles.form_add_task_container} onSubmit={handleAddTask}>
      <input
        className={`${styles.input_newtask} ${theme === 'light' ? styles.input_newtask_lightTheme : styles.input_newtask_darkTheme}`}
        type="text"
        placeholder="Add task..."
        value={textTask}
        onChange={(e) => setTextTask(e.target.value)}
      />
      <button
        className={styles.btn_add_container}
        type="submit"
        disabled={isLoading}
      >
        <img
          className={styles.icon_btn_add}
          src={theme === 'light' ? icon_add_lightTheme : icon_add_darkTheme}
          alt="icon_add"
        />
      </button>
      {isLoading && <p>is Loading...</p>}
      {isError && <p>Error adding task!</p>}
    </form>
  );
};

export default NewTask;
