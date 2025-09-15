import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuth ? (
        <AuthPage onAuth={() => setIsAuth(true)} />
      ) : (
        <>
          <Dashboard onLogout={handleLogout} />
          <button className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-full shadow" onClick={() => setShowTaskForm(true)}>
            + Add Task
          </button>
          {showTaskForm && (
            <TaskForm onSubmit={async (form) => {
              await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
              });
            }} onClose={() => setShowTaskForm(false)} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
