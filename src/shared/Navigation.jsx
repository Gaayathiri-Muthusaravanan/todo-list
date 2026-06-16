import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import styles from '../css/Header.module.css'
function Navigation() {
  const { isAuthenticated } = useAuth();

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: isActive ? 'underline' : 'none',
    padding: '6px 0',
    borderTop: isActive ? '3px solid #5eaac7' : '3px solid transparent',

  });

  return (
    <nav>
      <ul className={styles.navLinks}>
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