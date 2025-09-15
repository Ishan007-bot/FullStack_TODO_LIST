import React, { useState } from 'react';

export default function TaskForm({ onSubmit, initial = {}, onClose }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    category: initial.category || ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-gray-200 relative animate-fadeIn" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-extrabold mb-6 text-center text-purple-600 tracking-tight drop-shadow">Add / Update Task</h2>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white w-full py-3 rounded-lg font-bold shadow hover:scale-105 transition mb-2">Save</button>
        <button type="button" className="text-gray-500 w-full mt-2 underline hover:text-purple-500 transition" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
