import { useState, useEffect } from 'react';
import axios from 'axios';

const CONDITIONS = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy', 'Stormy', 'Foggy'];

const emptyForm = {
  recordDate: '',
  temperature: '',
  conditions: 'Sunny',
  location: '',
  notes: '',
};

export default function WeatherForm({ editingRecord, onSaved, onCancelEdit, setMessage }) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (editingRecord) {
      setForm({
        recordDate: editingRecord.recordDate?.split('T')[0] || '',
        temperature: editingRecord.temperature,
        conditions: editingRecord.conditions,
        location: editingRecord.location,
        notes: editingRecord.notes || '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingRecord]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!form.recordDate) return setMessage('error', 'Please select a record date.');
    if (form.temperature === '' || isNaN(form.temperature))
      return setMessage('error', 'Temperature must be a valid number.');
    const t = Number(form.temperature);
    if (t < -100 || t > 60) return setMessage('error', 'Temperature must be between -100°C and 60°C.');
    if (!form.location.trim() || form.location.trim().length < 2)
      return setMessage('error', 'Location must be at least 2 characters.');

    setLoading(true);
    try {
      if (editingRecord) {
        await axios.put(`/api/weather/${editingRecord._id}`, form);
        setMessage('success', 'Weather record updated successfully ✅');
      } else {
        await axios.post('/api/weather', form);
        setMessage('success', 'Weather record added successfully ✅');
      }
      setForm(emptyForm);
      onSaved();
    } catch (err) {
      setMessage('error', err.response?.data?.message || 'Failed to save record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>{editingRecord ? '✏️ Edit Record' : '➕ Add Weather Observation'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input type="date" name="recordDate" value={form.recordDate} onChange={handleChange} />
          <input
            type="number"
            name="temperature"
            placeholder="Temperature (°C)"
            step="0.1"
            value={form.temperature}
            onChange={handleChange}
          />
          <select name="conditions" value={form.conditions} onChange={handleChange}>
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location (e.g., Chennai)"
            value={form.location}
            onChange={handleChange}
          />
          <textarea
            className="full"
            name="notes"
            rows="2"
            placeholder="Notes (optional, max 250 chars)"
            value={form.notes}
            onChange={handleChange}
          />
        </div>
        <div className="btn-row">
          {editingRecord && (
            <button type="button" className="btn btn-edit" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving…' : editingRecord ? 'Update' : 'Add Record'}
          </button>
        </div>
      </form>
    </div>
  );
}