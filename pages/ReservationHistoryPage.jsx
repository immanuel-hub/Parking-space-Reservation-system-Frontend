import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function ReservationHistoryPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function loadReservations() {
      const response = await axiosClient.get('/reservations/');
      setReservations(response.data);
    }
    loadReservations();
  }, []);

  return (
    <div>
      <h1>My Reservations</h1>
      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation.id} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '12px' }}>
            <p>Reservation #{reservation.id}</p>
            <p>Space: {reservation.space}</p>
            <p>From: {new Date(reservation.start_time).toLocaleString()}</p>
            <p>To: {new Date(reservation.end_time).toLocaleString()}</p>
            <p>Status: {reservation.status}</p>
          </div>
        ))
      )}
    </div>
  );
}