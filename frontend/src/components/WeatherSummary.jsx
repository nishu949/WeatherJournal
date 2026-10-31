export default function WeatherSummary({ summary }) {
  if (!summary || !summary.totalRecords) return null;

  return (
    <div className="card">
      <h2>📊 Summary</h2>
      <div className="stats">
        <div className="stat">
          <div className="value">{summary.totalRecords}</div>
          <div className="label">Total Records</div>
        </div>
        <div className="stat">
          <div className="value">{summary.averageTemperature}°C</div>
          <div className="label">Avg Temperature</div>
        </div>
        <div className="stat">
          <div className="value">{summary.byCondition[0]?._id || '—'}</div>
          <div className="label">Most Frequent Condition</div>
        </div>
        <div className="stat">
          <div className="value">{summary.byLocation[0]?._id || '—'}</div>
          <div className="label">Top Location</div>
        </div>
      </div>
    </div>
  );
}