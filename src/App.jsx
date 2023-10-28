import { useState, useEffect, useMemo } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import Filters from './components/Filters';
import { exportToCSV } from './utils/csv';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Education', 'Other'];

function loadTransactions() {
  try {
    return JSON.parse(localStorage.getItem('expense_transactions')) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [filterCategory, setFilterCategory] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('expense_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t) => {
    setTransactions((prev) => [{ ...t, id: Date.now().toString() }, ...prev]);
    setShowForm(false);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (filterCategory !== 'All' && t.category !== filterCategory) return false;
      if (dateRange.start && t.date < dateRange.start) return false;
      if (dateRange.end && t.date > dateRange.end) return false;
      return true;
    });
  }, [transactions, filterCategory, dateRange]);

  const summary = useMemo(() => {
    const income = filtered.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = filtered.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [filtered]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Expense Dashboard</h1>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => exportToCSV(filtered)}>Export CSV</button>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Transaction'}
          </button>
        </div>
      </header>

      {showForm && <TransactionForm categories={CATEGORIES} onSubmit={addTransaction} />}

      <SummaryCards summary={summary} />

      <Charts transactions={filtered} />

      <Filters
        categories={CATEGORIES}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <TransactionList transactions={filtered} onDelete={deleteTransaction} />
    </div>
  );
}
