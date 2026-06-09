import { useEffect, useState } from 'react';

function ProfilePage() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  useEffect(() => {
    async function loadStatisticss() {
      const response = await fetch('/api/todos');
      const todos = await response.json();

      const total = todos.length;
      const completed = todos.filter(todo => todo.completed).length;
      const active = total - completed;

      setStats({ total, completed, active });
    }

    loadStatisticss();
  }, []);

  return (
    <div>
      <h1>Profile</h1>

      <p>Total Todos: {stats.total}</p>
      <p>Completed Todos: {stats.completed}</p>
      <p>Active Todos: {stats.active}</p>
    </div>
  );
}

export default ProfilePage;