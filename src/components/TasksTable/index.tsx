import type { Task } from "../../types/task";
import { useAppDispatch } from "../../store/hooks";
import { deleteTask } from "../../store/tasksSlice";
import styles from "./TaskTable.module.scss";
import { useState } from "react";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

interface Props {
  tasks: Task[];
}

export default function TasksTable({ tasks }: Props) {
  const dispatch = useAppDispatch();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned</th>
            <th>Due</th>
            <th>Hours</th>
            <th>Category</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className={styles.mobileCard}>
              <td data-label="Title">{t.title}</td>
              <td data-label="Assigned">{t.assignedTo || "-"}</td>
              <td data-label="Due">{t.dueDate ? t.dueDate.split("T")[0] : "-"}</td>
              <td data-label="Hours">{t.estimatedHours || "-"}</td>
              <td data-label="Category">{t.category}</td>
              <td data-label="Status">{t.status}</td>

              <td data-label="" className={styles.actions}>
                <button onClick={() => setEditingTask(t)}>Edit</button>
                <button onClick={() => dispatch(deleteTask(t.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTask && (
        <EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} />
      )}
    </>
  );
}