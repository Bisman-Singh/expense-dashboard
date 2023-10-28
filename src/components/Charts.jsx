import { useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from 'recharts';

const COLORS = ['#14b8a6', '#f43f5e', '#a78bfa', '#facc15', '#38bdf8', '#fb923c', '#4ade80', '#e879f9'];

export default function Charts({ transactions }) {
  const categoryData = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return Object.entries(map).map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }));
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      const month = t.date.slice(0, 7);
      if (!map[month]) map[month] = { month, income: 0, expenses: 0 };
      if (t.type === 'income') map[month].income += t.amount;
      else map[month].expenses += t.amount;
    });
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  const balanceOverTime = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    let balance = 0;
    return sorted.map((t) => {
      balance += t.type === 'income' ? t.amount : -t.amount;
      return { date: t.date, balance: Math.round(balance * 100) / 100 };
    });
  }, [transactions]);

  if (transactions.length === 0) return null;

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Expenses by Category</h3>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="chart-empty">No expense data</p>
        )}
      </div>

      <div className="chart-card">
        <h3>Monthly Overview</h3>
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8 }} />
              <Legend />
              <Bar dataKey="income" fill="#4ade80" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="chart-empty">No monthly data</p>
        )}
      </div>

      <div className="chart-card chart-wide">
        <h3>Balance Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={balanceOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8 }} />
            <Line type="monotone" dataKey="balance" stroke="#14b8a6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
