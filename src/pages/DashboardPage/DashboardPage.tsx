import { useAppSelector } from "../../store/hooks";
import styles from "./DashboardPage.module.scss";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function DashboardPage() {
  const tasks = useAppSelector((s) => s.tasks.list);

  const total = tasks.length;

  const byCategory = Object.entries(
    tasks.reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const byStatus = Object.entries(
    tasks.reduce((acc: any, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const colors = ["#3b82f6","#10b981","#f59e0b","#ef4444"];

  return (
    <div className={styles.wrapper}>
      <h1>Dashboard</h1>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.card}>
          <h3>Total Tasks</h3>
          <p>{total}</p>
        </div>
        <div className={styles.card}>
          <h3>Completed</h3>
          <p>{tasks.filter(t=>t.status==="Closed").length}</p>
        </div>
        <div className={styles.card}>
          <h3>Active</h3>
          <p>{tasks.filter(t=>t.status==="Active").length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className={styles.charts}>
        <div className={styles.chartBox}>
          <h3>Tasks by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={80} label>
                {byCategory.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartBox}>
          <h3>Tasks by Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byStatus}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false}/>
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}