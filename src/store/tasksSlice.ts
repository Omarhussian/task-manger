import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../types/task";
import { tasksService } from "../api/tasksService";
import { v4 as uuid } from "uuid";

interface TasksState {
  list: Task[];
  loading: boolean;
}

const initialState: TasksState = {
  list: [],
  loading: false,
};

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  return await tasksService.getAll();
});

export const addTask = createAsyncThunk("tasks/add", async (task: Omit<Task, "id" | "createdAt">) => {
  const newTask: Task = {
    ...task,
    id: uuid(),
    createdAt: new Date().toISOString(),
  };

  await tasksService.create(newTask);
  return newTask;
});

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
    const updated = await tasksService.update(id, updates);
    return updated!;
  }
);

export const deleteTask = createAsyncThunk("tasks/delete", async (id: string) => {
  await tasksService.delete(id);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => { state.loading = true })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.list.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.list = state.list.filter(t => t.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;