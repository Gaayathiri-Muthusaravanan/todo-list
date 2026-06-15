import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import '../css/header.css'
function Navigation() {
  const { isAuthenticated } = useAuth();

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: isActive ? 'underline' : 'none',
  });

  return (
    <nav>
      <ul className="nav-links"
  style={{
    textDecoration: "none",
    listStyle: 'none',
    display: 'flex',
    gap: '5rem',
    padding: 0,
  }}
>
  <li>
    <NavLink to="/about" style={navLinkStyle}>
      About
    </NavLink>
  </li>

  {isAuthenticated ? (
    <>
      <li>
        <NavLink to="/todos" style={navLinkStyle}>
          Todos
        </NavLink>
      </li>

      <li>
        <NavLink to="/profile" style={navLinkStyle}>
          Profile
        </NavLink>
      </li>
    </>
  ) : (
    <li>
      <NavLink to="/login" style={navLinkStyle}>
        Login
      </NavLink>
    </li>
  )}
</ul>
    </nav>
  );
}

export default Navigation;