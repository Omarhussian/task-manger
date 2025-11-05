import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { addTask } from "../../store/tasksSlice";
import type { TaskCategory, TaskStatus } from "../../types/task";
import styles from "./TaskForm.module.scss";

interface FormValues {
  title: string;
  description?: string;
  assignedTo?: string;
  dueDate?: string;
  estimatedHours?: number;
  category: TaskCategory;
  status: TaskStatus;
}

export default function TaskForm() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { category: "Dev", status: "New" }
  });

  const onSubmit = (data: FormValues) => {
    dispatch(addTask(data));
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <input {...register("title", { required: true })} placeholder="Task Title" />
        <input {...register("assignedTo")} placeholder="Assigned To" />
        <input {...register("dueDate")} type="date" />

        <select {...register("category")}>
          <option value="Dev">Dev</option>
          <option value="Test">Test</option>
          <option value="UI">UI</option>
          <option value="Db">Db</option>
        </select>

        <select {...register("status")}>
          <option value="New">New</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </select>

        <input
          {...register("estimatedHours")}
          type="number"
          placeholder="Estimated Hours"
        />
      </div>

      <textarea {...register("description")} placeholder="Description" />

      <button type="submit" className={styles.btn}>
        + Add Task
      </button>
    </form>
  );
}