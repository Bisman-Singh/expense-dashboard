export default function Filters({ categories, filterCategory, setFilterCategory, dateRange, setDateRange }) {
  return (
    <div className="filters">
      <h2>Filters</h2>
      <div className="filter-row">
        <div className="form-group">
          <label>Category</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>From</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label>To</label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
          />
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => { setFilterCategory('All'); setDateRange({ start: '', end: '' }); }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
