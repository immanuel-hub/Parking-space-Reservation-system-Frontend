import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <h1 className="page-title">Parking Reservation System</h1>
          <p className="page-subtitle">Reserve your parking space before arrival.</p>
        </div>
      </div>
      <div className="page-note">
        Simple, bright, and made for everyone who needs a quick parking solution.
      </div>
      <div className="link-row">
        <Link className="button button-full" to="/login">Login</Link>
        <Link className="button-secondary button-full" to="/register">Register</Link>
      </div>
    </div>
  );
}
