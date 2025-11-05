import type { Task } from "../types/task";

const STORAGE_KEY = "tasks_storage_v1";

function load(): Task[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function save(data: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const tasksService = {
  getAll: (): Promise<Task[]> => Promise.resolve(load()),

  create: (task: Task): Promise<Task> => {
    const list = load();
    list.unshift(task);
    save(list);
    return Promise.resolve(task);
  },

  update: (id: string, updates: Partial<Task>): Promise<Task | null> => {
    const list = load();
    const index = list.findIndex(t => t.id === id);
    if (index === -1) return Promise.resolve(null);

    list[index] = { ...list[index], ...updates };
    save(list);
    return Promise.resolve(list[index]);
  },

  delete: (id: string): Promise<boolean> => {
    const list = load().filter(t => t.id !== id);
    save(list);
    return Promise.resolve(true);
  }
};