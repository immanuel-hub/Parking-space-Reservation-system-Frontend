import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function SpacesPage() {
  const [spaces, setSpaces] = useState([]);
  const [error, setError] = useState('');

  const loadSpaces = async () => {
    try {
      const response = await axiosClient.get('/parking-spaces/');
      setSpaces(response.data);
    } catch {
      setError('Failed to load parking spaces.');
    }
  };

  useEffect(() => {
    loadSpaces();
  }, []);

  const reserveSpace = async (spaceId) => {
    try {
      await axiosClient.post('/reservations/', {
        vehicle: 1,
        space: spaceId,
        start_time: '2026-08-01T09:00:00Z',
        end_time: '2026-08-01T12:00:00Z',
      });
      loadSpaces();
    } catch {
      setError('Reservation failed. The space may already be taken.');
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <h1 className="page-title">Parking Spaces</h1>
          <p className="page-subtitle">Choose an available spot and reserve it fast.</p>
        </div>
      </div>
      {error && <p className="error-text">{error}</p>}
      <div className="card-grid">
        {spaces.map((space) => (
          <div key={space.id} className="card">
            <p><strong>Space #{space.space_number}</strong></p>
            <p>Status: <span className="status-chip">{space.status}</span></p>
            <p>{space.is_taken ? 'Taken' : 'Available'}</p>
            <button className="button button-full" onClick={() => reserveSpace(space.id)} disabled={space.is_taken}>
              {space.is_taken ? 'Unavailable' : 'Reserve'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
