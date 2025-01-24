import { useState } from 'react';
import { useAddTodoMutation } from '../../services/todoApi';
import styles from './NewTask.module.css';
import icon_add from './img/icon_add.png';
import { v4 as uuidv4 } from 'uuid';

const NewTask: React.FC = () => {
  const [textTask, setTextTask] = useState<string>('');
  const [addTodo, { isLoading, isError }] = useAddTodoMutation();

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
        className={styles.input_newtask}
        type="text"
        placeholder="Add task..."
        value={textTask}
        onChange={(e) => setTextTask(e.target.value)}
      />
      <button className={styles.btn_add_container} type="submit" disabled={isLoading}>
        <img className={styles.icon_btn_add} src={icon_add} alt="icon_add" />
      </button>
      {isLoading && <p>is Loading...</p>}
      {isError && <p>Error adding task!</p>}
    </form>
  );
};

export default NewTask;
