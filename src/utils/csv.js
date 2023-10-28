export function exportToCSV(transactions) {
  if (transactions.length === 0) return;
  const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
  const rows = transactions.map((t) => [t.date, t.type, t.category, t.amount.toFixed(2), t.description || '']);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
