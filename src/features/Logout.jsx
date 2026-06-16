import '../App.css'
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      navigate('/login');

    } 
    else {
      setError(result.error);
      setIsLoggingOff(false);
    }
  };

  return (
    <button id="logOffButton" onClick={handleLogout}>
      Logoff
    </button>
  );

}
export default Logout;