import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../css/ProfilePage.module.css'
function ProfilePage() {
  const { token, email } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;

      try {
        setLoading(true);
        setError('');

        const options = {
          method: 'GET',
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        };

        const response = await fetch('/api/tasks', options);

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const datas = await response.json();
        const todos = datas.tasks;

        // Calculate statistics
        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setStats({ total, completed, active });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <h1 className={styles.profileHeading}>Profile</h1>
        <div className={styles.profileUser}>
          <p>Hello {email},</p>
        </div>
      </div>


      {loading && <p className={styles.infoText}> Loading statistics...</p>}
      {error && <p className={styles.errorText} >{error}</p>}
      {!loading && !error && (
        <div className={styles.statsGrid}>
          <div className={styles.cardTotal}>
            <span className={styles.icon}>📋</span>
            <h2>Total Todos</h2>

            <p className={styles.cardPara}>{stats.total}</p>
          </div>
          <div className={styles.cardCompleted}>
            <span className={styles.icon}>✅</span>
            <h2>Completed Todos</h2>
            <p className={styles.cardPara}>{stats.completed}</p>
          </div>
          <div className={styles.cardActive}>
            <span className={styles.icon}>⏳</span>
            <h2>Active Todos</h2>
            <p className={styles.cardPara}>{stats.active}</p>
          </div>
          <div className={styles.cardRate}>
            <span className={styles.icon}>📊</span>
            <h2>Completion Rate</h2>
            <p className={styles.cardPara}>

              {stats.total > 0
                ? Math.round((stats.completed / stats.total) * 100)
                : 0}
              %
            </p>
          </div>
        </div>)}
    </div>
  );
}

export default ProfilePage;