
import { useAuth } from "../contexts/AuthContext";

function Logout(){
    const {logout} =useAuth();
     const handleLogout = async () => {
    const result = await logout();

    if (!result.success) {
      console.error(result.error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logoff
    </button>
  );

}
export default Logout;