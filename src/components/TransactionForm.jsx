import { useState } from 'react';

export default function TransactionForm({ categories, onSubmit }) {
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    category: categories[0],
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date) return;
    onSubmit({ ...form, amount: parseFloat(form.amount) });
    setForm({ type: 'expense', amount: '', category: categories[0], date: new Date().toISOString().split('T')[0], description: '' });
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="0.00" min="0.01" step="0.01" required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <div className="form-group flex-2">
          <label>Description</label>
          <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description..." />
        </div>
      </div>
      <button type="submit" className="btn btn-primary full-width">Add Transaction</button>
    </form>
  );
}
