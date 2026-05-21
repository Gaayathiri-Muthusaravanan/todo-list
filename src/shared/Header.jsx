import '../App.css'
import todoImg from '../assets/todo.jpeg'
function Header(){
    return(
        <div id = "appHeading">
            <img id = "todoImage" src = {todoImg} alt="image" />
            <h1>TO-DO LIST</h1>
           
        </div>
        
    )
}
export default Header;