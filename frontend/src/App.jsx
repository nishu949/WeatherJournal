import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import WeatherForm from './components/WeatherForm';
import WeatherList from './components/WeatherList';
import WeatherSummary from './components/WeatherSummary';
import Message from './components/Message';
import './App.css';

export default function App() {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [message, setMessageState] = useState({ type: '', text: '' });

  const setMessage = (type, text) => setMessageState({ type, text });

 
  useEffect(() => {
    if (!message.text) return;
    const t = setTimeout(() => setMessageState({ type: '', text: '' }), 4000);
    return () => clearTimeout(t);
  }, [message]);

  const fetchRecords = useCallback(async () => {
    try {
      const res = await axios.get('/api/weather');
      setRecords(res.data.data);
    } catch (err) {
      setMessage('error', 'Failed to load weather records.');
    }
  }, []);

  const fetchSummary = useCallback(async () => {
    try {
      const res = await axios.get('/api/weather/summary/stats');
      setSummary(res.data.data);
    } catch (err) {
      
      console.error(err);
    }
  }, []);

  const refresh = () => {
    fetchRecords();
    fetchSummary();
  };

  useEffect(() => {
    refresh();
  }, [fetchRecords, fetchSummary]);

  const handleEdit = (record) => {
    setEditingRecord(record);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this weather record?')) return;
    try {
      await axios.delete(`/api/weather/${id}`);
      setMessage('success', 'Record deleted successfully 🗑️');
      if (editingRecord?._id === id) setEditingRecord(null);
      refresh();
    } catch (err) {
      setMessage('error', err.response?.data?.message || 'Failed to delete record.');
    }
  };

  const handleSaved = () => {
    setEditingRecord(null);
    refresh();
  };

  return (
    <div className="container">
      <h1>🌤️ Weather Journal</h1>
      <p className="subtitle">Record your weather observations and view summaries</p>

      <Message type={message.type} text={message.text} />

      <WeatherForm
        editingRecord={editingRecord}
        onSaved={handleSaved}
        onCancelEdit={() => setEditingRecord(null)}
        setMessage={setMessage}
      />

      <WeatherSummary summary={summary} />

      <WeatherList records={records} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}