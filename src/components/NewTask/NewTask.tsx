import styles from './NewTask.module.css';
import icon_add from './img/icon_add.png';

const NewTask = () => {
  return (
    <form className={styles.form_add_task_container}>
      <input
        className={styles.input_newtask}
        type="text"
        placeholder="Add task..."
      ></input>
      <button className={styles.btn_add_container}>
        <img className={styles.icon_btn_add} src={icon_add} alt="icon_add" />
      </button>
    </form>
  );
};
export default NewTask;
