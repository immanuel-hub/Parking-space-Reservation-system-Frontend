import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login({ username, password });
      navigate('/spaces');
    } catch {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <h1 className="page-title">Login</h1>
          <p className="page-subtitle">Use your account to reserve parking.</p>
        </div>
      </div>
      {error && <p className="error-text">{error}</p>}
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </label>
        <button className="button button-full" type="submit">Login</button>
      </form>
    </div>
  );
}
