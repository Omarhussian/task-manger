import { Routes, Route, Navigate } from "react-router-dom";
import TasksPage from "../pages/TaskPage/TasksPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}