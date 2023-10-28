export default function SummaryCards({ summary }) {
  return (
    <div className="summary-cards">
      <div className="card card-balance">
        <span className="card-label">Balance</span>
        <span className="card-value">${summary.balance.toFixed(2)}</span>
      </div>
      <div className="card card-income">
        <span className="card-label">Income</span>
        <span className="card-value">+${summary.income.toFixed(2)}</span>
      </div>
      <div className="card card-expense">
        <span className="card-label">Expenses</span>
        <span className="card-value">-${summary.expenses.toFixed(2)}</span>
      </div>
    </div>
  );
}
