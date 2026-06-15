import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>

      <p>The page you are looking for does not exist.</p>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/todos">Todos</Link>
        </li>
      </ul>
    </div>
  );
}

export default NotFoundPage;