import React, { useEffect, useState } from 'react';

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    let url = 'http://localhost:3000/tasks';
    if (category) url += `?category=${category}`;
    const res = await fetch(url);
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => { fetchTasks(); }, [category]);

  const handleCheck = async (id, isDone) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone })
    });
    fetchTasks();
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight drop-shadow">Dashboard</h1>
        <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition" onClick={onLogout}>Logout</button>
      </div>
      <div className="mb-6 flex items-center gap-2">
        <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Filter by category" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition w-64" />
        <span className="text-gray-500">(Leave blank for all)</span>
      </div>
      {loading ? <div className="text-lg text-blue-500 font-semibold">Loading...</div> : (
        <ul className="space-y-4">
          {tasks.map(task => (
            <li key={task._id} className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between border border-gray-200 hover:shadow-xl transition">
              <div>
                <span className={task.isDone ? 'line-through text-gray-400 text-lg' : 'text-lg font-semibold'}>{task.title}</span>
                <span className="ml-2 text-sm text-purple-500 font-bold">[{task.category}]</span>
                {task.description && <div className="text-gray-500 text-sm mt-1">{task.description}</div>}
              </div>
              <input type="checkbox" checked={task.isDone} onChange={e => handleCheck(task._id, e.target.checked)} className="w-5 h-5 accent-blue-500" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
