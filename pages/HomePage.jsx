import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Parking Reservation System</h1>
      <p>Reserve your parking space before arrival.</p>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
}