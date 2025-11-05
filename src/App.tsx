import { BrowserRouter, Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import styles from "./styles/LayoutComponents/Nav.module.scss";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className={styles.nav}>
          <Link to="/tasks">Tasks</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}