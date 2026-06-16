import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import styles from '../css/LoginPage.module.css';
import { sanitizeInput } from "../utils/sanitize";
function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get intended destination from location state, default to /todos
  const from = location.state?.from?.pathname || '/todos';

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Handle login form submission

  // ... existing login logic

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoggingOn(true);
    setAuthError("");
    const sanitizedEmail = email.trim();
    const sanitizedPassword = password.trim();

    if (!sanitizedEmail.includes("@")) {
      setAuthError("Please enter a valid email");
      setIsLoggingOn(false);
      return;
    }

    if (sanitizedPassword.length < 6) {
      setAuthError("Password must be at least 6 characters");
      setIsLoggingOn(false);
      return;
    }

    const result = await login(sanitizedEmail, sanitizedPassword);
    setIsLoggingOn(false);
    if (!result.success) {
      setAuthError("Invalid email or password");
    }

  }


  return (
    <div className={styles.loginContainer}>

      <div className={styles.splitLeft}>
        <div className={styles.leftContent}>
          <h1>Stay Organized. Stay Ahead.</h1>
          <p>Organize your tasks, stay focused, and get things done effortlessly.</p>
        </div>
      </div>

      <form className={styles.logonForm} onSubmit={handleSubmit} noValidate>
        <h2>Hello again,</h2>
        <p>Login to your account to continue</p>
        <label className={styles.inputLabel} htmlFor="email">Email</label>
        <input type="email"

          id="email"
          className={styles.inputLogon}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className={styles.InputLabel} htmlFor="password" >Password</label>
        <input type="password"

          id="password"
          className={styles.inputLogon}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoggingOn}
          id="logonButton"
          className={styles.logonButton}>
          {isLoggingOn ? "Logging in" : "Logon"}

        </button>
        {authError ? <p className={styles.error}>{authError}</p> : null}
      </form>
    </div>

  )
}
export default LoginPage;