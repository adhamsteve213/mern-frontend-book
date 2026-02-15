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
    <div className="p-8 min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-full max-w-md" onSubmit={handleSubmit}>
        <h3 className="text-xl font-bold mb-4">Signup</h3>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="border rounded w-full px-3 py-2 mb-3" />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="border rounded w-full px-3 py-2 mb-3" />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="border rounded w-full px-3 py-2 mb-3" />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Sign Up</button>
        {/* OAuth removed - use manual signup instead */}
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;