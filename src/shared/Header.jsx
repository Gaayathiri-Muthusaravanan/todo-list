import '../App.css'
import todoImg from '../assets/todo.jpeg'
import { useAuth } from '../contexts/AuthContext';
import Logout from "../features/Logout"
function Header(){
    const { isAuthenticated } = useAuth();
    return(
        <div id = "appHeading">
            <img id = "todoImage" src = {todoImg} alt="image" />
            <h1>TO-DO LIST</h1>
             {isAuthenticated&& <Logout/>}

        </div>
        
    )
}
export default Header;