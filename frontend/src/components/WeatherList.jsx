export default function WeatherList({ records, onEdit, onDelete }) {
  if (!records.length) {
    return <div className="card"><div className="empty">No weather records yet. Add your first observation above ☁️</div></div>;
  }

  return (
    <div className="card">
      <h2>📒 Weather Records</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Temp (°C)</th>
            <th>Condition</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{new Date(r.recordDate).toLocaleDateString()}</td>
              <td>{r.location}</td>
              <td>{r.temperature}°C</td>
              <td><span className="badge">{r.conditions}</span></td>
              <td>{r.notes || '—'}</td>
              <td>
                <button className="btn btn-edit" onClick={() => onEdit(r)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}