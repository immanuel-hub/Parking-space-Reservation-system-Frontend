import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      setError('Passwords must match.');
      return;
    }

    try {
      await axiosClient.post('/auth/register/', form);
      navigate('/login');
    } catch (err) {
      const serverData = err?.response?.data;
      let message = 'Registration failed.';

      if (serverData) {
        if (typeof serverData === 'string') {
          message = serverData;
        } else if (serverData.detail) {
          message = serverData.detail;
        } else if (serverData.error) {
          message = serverData.error;
        } else {
          message = Object.values(serverData)
            .flat()
            .filter(Boolean)
            .join(' ');
        }
      } else if (err?.message) {
        message = err.message;
      }

      setError(message);
      console.error('Registration error', err);
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <h1 className="page-title">Register</h1>
          <p className="page-subtitle">Create an account for fast parking access.</p>
        </div>
      </div>
      {error && <p className="error-text">{error}</p>}
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        </label>
        <label>
          Confirm Password
          <input name="password2" type="password" value={form.password2} onChange={handleChange} placeholder="Confirm password" required />
        </label>
        <button className="button button-full" type="submit">Register</button>
      </form>
    </div>
  );
}
