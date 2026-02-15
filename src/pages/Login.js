import React, { useState, useContext } from 'react';
import { api, setAuthToken } from '../api';
import { AuthContext } from '../contexts/AuthContext';

const Login = ({ onLogin }) => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: ''});
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', form);
      const token = res?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        setAuthToken(token);
        setMessage('Logged in');
        login && login(res.data);
        onLogin && onLogin(res.data);
      }
    } catch (err) {
      console.error(err);
      setMessage('Login failed');
    }
  };

  // OAuth providers removed - manual login only

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h3 className="auth-title">Login</h3>
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="auth-input" />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="auth-input" />
        <button type="submit" className="auth-submit">Login</button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;