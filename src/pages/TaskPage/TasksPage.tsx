import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTasks } from "../../store/tasksSlice";
import TaskForm from "../../components/TaskForm/index";
import TasksTable from "../../components/TasksTable/index";
import Icon from "../../components/base/Icon/Icon";
import styles from "./TaskPage.module.scss";

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const focusForm = () => {
    const input = document.querySelector("input[name='title']") as HTMLInputElement;
    if (input) input.focus();
  };

  return (
    <div className={styles.wrapper}>
      <h1>Tasks</h1>

      <div className={styles.card}>
        <TaskForm />
      </div>

      <div className={styles.card}>
        {loading ? (
          <p>Loading...</p>
        ) : list.length === 0 ? (
          <div className={styles.empty}>
            <Icon name="clipboard" size={52} className={styles.icon} />

            <h3>No tasks yet</h3>
            <p>Create your first task to get started.</p>

            <button className={styles.addBtn} onClick={focusForm}>
              + Add Task
            </button>
          </div>
        ) : (
          <TasksTable tasks={list} />
        )}
      </div>
    </div>
  );
}