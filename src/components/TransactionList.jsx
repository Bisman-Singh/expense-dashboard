export default function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return <div className="empty-state">No transactions yet. Add one to get started!</div>;
  }

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.description || '—'}</td>
                <td><span className="badge">{t.category}</span></td>
                <td><span className={`type-badge ${t.type}`}>{t.type}</span></td>
                <td className={t.type === 'income' ? 'amount-income' : 'amount-expense'}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </td>
                <td>
                  <button className="btn-delete" onClick={() => onDelete(t.id)} title="Delete">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
