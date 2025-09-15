import React, { useState } from 'react';

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const url = isLogin ? '/auth/login' : '/auth/register';
    try {
      const res = await fetch(`http://localhost:3000${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token || '');
        onAuth();
      } else {
        setError(data.msg || 'Error');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-200" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600 tracking-tight drop-shadow">{isLogin ? 'Login' : 'Register'}</h2>
        {!isLogin && (
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        )}
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        {error && <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>}
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-full py-3 rounded-lg font-bold shadow hover:scale-105 transition mb-3">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" className="text-blue-500 w-full underline hover:text-purple-500 transition" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
}
