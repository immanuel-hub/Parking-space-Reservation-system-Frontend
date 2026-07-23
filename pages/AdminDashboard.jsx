import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function AdminDashboard() {
  const [spaces, setSpaces] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [newSpaceNumber, setNewSpaceNumber] = useState('');

  const loadData = async () => {
    try {
      const [spacesRes, reservationsRes] = await Promise.all([
        axiosClient.get('/parking-spaces/'),
        axiosClient.get('/reservations/'),
      ]);
      setSpaces(spacesRes.data);
      setReservations(reservationsRes.data);
    } catch {
      setError('Failed to load admin data.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createSpace = async () => {
    try {
      await axiosClient.post('/parking-spaces/', {
        parking_lot: 1,
        space_number: Number(newSpaceNumber),
        status: 'available',
      });
      setNewSpaceNumber('');
      loadData();
    } catch {
      setError('Failed to create parking space.');
    }
  };

  const deleteSpace = async (spaceId) => {
    try {
      await axiosClient.delete(`/parking-spaces/${spaceId}/`);
      loadData();
    } catch {
      setError('Failed to delete parking space.');
    }
  };

  const completeReservation = async (reservationId) => {
    try {
      await axiosClient.patch(`/reservations/${reservationId}/`, { status: 'completed' });
      loadData();
    } catch {
      setError('Failed to update reservation status.');
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Manage parking spaces and reservations.</p>
        </div>
      </div>
      {error && <p className="error-text">{error}</p>}

      <section className="card">
        <h2>Create Parking Space</h2>
        <div className="form-grid">
          <label>
            Space number
            <input
              type="number"
              placeholder="Space number"
              value={newSpaceNumber}
              onChange={(e) => setNewSpaceNumber(e.target.value)}
            />
          </label>
          <button className="button button-full" onClick={createSpace}>Create Space</button>
        </div>
      </section>

      <section className="card">
        <h2>Parking Spaces</h2>
        <div className="card-list">
          {spaces.map((space) => (
            <div key={space.id} className="card">
              <p><strong>Space #{space.space_number}</strong></p>
              <p>Status: <span className="status-chip">{space.status}</span></p>
              <button className="button-secondary button-full" onClick={() => deleteSpace(space.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Reservations</h2>
        <div className="card-list">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="card">
              <p><strong>Reservation #{reservation.id}</strong></p>
              <p>User: {reservation.user}</p>
              <p>Space: {reservation.space}</p>
              <p>Status: <span className="status-chip">{reservation.status}</span></p>
              {reservation.status === 'booked' && (
                <button className="button button-full" onClick={() => completeReservation(reservation.id)}>
                  Mark Completed
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
