import React, { useState } from 'react';
import { api, setAuthToken } from '../api';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Signup = ({ onSignup }) => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: ''});
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/register', form);
      const token = res?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        setAuthToken(token);
        setMessage('Registered');
        login && login(res.data);
        onSignup && onSignup(res.data);
      }
    } catch (err) {
      console.error(err);
      setMessage('Registration failed');
    }
  };

  // OAuth removed; manual signup only

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h3 className="auth-title">Signup</h3>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="auth-input" />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="auth-input" />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="auth-input" />
        <button type="submit" className="auth-submit">Sign Up</button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;