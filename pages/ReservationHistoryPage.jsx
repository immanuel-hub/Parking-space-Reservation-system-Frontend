import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function ReservationHistoryPage() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  const loadReservations = async () => {
    try {
      const response = await axiosClient.get('/reservations/');
      setReservations(response.data);
    } catch {
      setError('Failed to load reservations.');
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const cancelReservation = async (reservationId) => {
    try {
      await axiosClient.delete(`/reservations/${reservationId}/`);
      loadReservations();
    } catch {
      setError('Failed to cancel reservation.');
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Reservations</h1>
          <p className="page-subtitle">View and manage your current bookings.</p>
        </div>
      </div>
      {error && <p className="error-text">{error}</p>}
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="card-grid">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="card">
              <p><strong>Reservation #{reservation.id}</strong></p>
              <p>Space: {reservation.space}</p>
              <p>From: {new Date(reservation.start_time).toLocaleString()}</p>
              <p>To: {new Date(reservation.end_time).toLocaleString()}</p>
              <p>Status: <span className="status-chip">{reservation.status}</span></p>
              {reservation.status !== 'cancelled' && (
                <button className="button button-full" onClick={() => cancelReservation(reservation.id)}>
                  Cancel Reservation
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
