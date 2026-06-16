import '../App.css'
import todoImg from '../assets/todo.jpeg'
import { useAuth } from '../contexts/AuthContext';
import Logout from "../features/Logout"
import styles from '../css/Header.module.css';
import Navigation from './Navigation';
function Header() {
    const { isAuthenticated } = useAuth();
    return (
        <div className={styles.appHeading}>
            <div className={styles.titleSection}>
                <img className={styles.todoImage} src={todoImg} alt="image" />
                <h1 className={styles.headingText}>TO-DO LIST</h1>
            </div>
            <Navigation />
            {isAuthenticated && <Logout />}

        </div>

    )
}
export default Header;