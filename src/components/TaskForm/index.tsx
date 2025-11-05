import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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

const taskSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  assignedTo: Yup.string().optional(),
  dueDate: Yup.string().optional(),
  estimatedHours: Yup.number().typeError("Must be a number").optional(),
  description: Yup.string().optional(),
  category: Yup.string().required(),
  status: Yup.string().required(),
});

export default function TaskForm() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(taskSchema) as any,
    defaultValues: { category: "Dev", status: "New" }
  });

  const onSubmit = (data: FormValues) => {
    dispatch(addTask(data));
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <input {...register("title")} placeholder="Task Title" />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        </div>

        <div className={styles.field}>
          <input {...register("assignedTo")} placeholder="Assigned To" />
        </div>

        <div className={styles.field}>
          <input {...register("dueDate")} type="date" />
        </div>

        <div className={styles.field}>
          <select {...register("category")}>
            <option value="Dev">Dev</option>
            <option value="Test">Test</option>
            <option value="UI">UI</option>
            <option value="Db">Db</option>
          </select>
          {errors.category && <p className={styles.error}>{errors.category.message}</p>}
        </div>

        <div className={styles.field}>
          <select {...register("status")}>
            <option value="New">New</option>
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && <p className={styles.error}>{errors.status.message}</p>}
        </div>

        <div className={styles.field}>
          <input {...register("estimatedHours")} type="number" placeholder="Estimated Hours" />
          {errors.estimatedHours && <p className={styles.error}>{errors.estimatedHours.message}</p>}
        </div>
      </div>

      <div className={styles.field}>
        <textarea {...register("description")} placeholder="Description" />
      </div>

      <button type="submit" className={styles.btn}>
        + Add Task
      </button>
    </form>
  );
}