import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function AdminDashboard() {
  const [spaces, setSpaces] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [spacesRes, reservationsRes] = await Promise.all([
        axiosClient.get('/parking-spaces/'),
        axiosClient.get('/reservations/'),
      ]);
      setSpaces(spacesRes.data);
      setReservations(reservationsRes.data);
    }
    loadData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Parking Spaces</h2>
        {spaces.map((space) => (
          <div key={space.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <p>Space #{space.space_number}</p>
            <p>Status: {space.status}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Reservations</h2>
        {reservations.map((reservation) => (
          <div key={reservation.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <p>Reservation #{reservation.id}</p>
            <p>User: {reservation.user}</p>
            <p>Space: {reservation.space}</p>
            <p>Status: {reservation.status}</p>
          </div>
        ))}
      </section>
    </div>
  );
}