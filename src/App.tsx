import { BrowserRouter, NavLink } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import styles from "./styles/LayoutComponents/Nav.module.scss";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className={styles.nav}>
          <NavLink 
            to="/tasks"
            className={({ isActive }) => isActive ? styles.active : ''}
          >
            Tasks
          </NavLink>
          <NavLink 
            to="/dashboard"
              className={({ isActive }) => isActive ? styles.active : ''}
            >
            Dashboard
          </NavLink>
        </nav>

        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}