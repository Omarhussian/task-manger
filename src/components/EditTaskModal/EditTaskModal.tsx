import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { updateTask } from "../../store/tasksSlice";
import type { Task } from "../../types/task";
import styles from "./EditTaskModal.module.scss";

interface Props {
  task: Task | null;
  onClose: () => void;
}

export default function EditTaskModal({ task, onClose }: Props) {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: task ?? {}
  });

  const onSubmit = (data: any) => {
    if (!task) return;

    dispatch(updateTask({ id: task.id, updates: data }));
    reset();
    onClose();
  };

  if (!task) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Edit Task</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title")} placeholder="Title" />
          <input {...register("assignedTo")} placeholder="Assigned To" />
          <input {...register("dueDate")} type="date" />
          
          <input {...register("estimatedHours")} type="number" placeholder="Hours" />

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

          <textarea {...register("description")} placeholder="Description" />

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancel
            </button>
            <button type="submit" className={styles.save}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}