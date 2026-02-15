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
    <div className="p-8 min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-full max-w-md" onSubmit={handleSubmit}>
        <h3 className="text-xl font-bold mb-4">Login</h3>
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="border rounded w-full px-3 py-2 mb-3" />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="border rounded w-full px-3 py-2 mb-3" />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Login</button>
        {/* OAuth removed - use manual login provided above */}
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Login;