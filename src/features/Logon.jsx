import { useState } from "react";
import '../App.css'
import { useAuth } from "../contexts/AuthContext";
function Logon(){
const {login} = useAuth();


    const [email, setEmail] = useState("");
    const  [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [isLoggingOn, setIsLoggingOn] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoggingOn(true);
        setAuthError("");
        const result = await login(email, password);

  setIsLoggingOn(false);

  if (!result.success) {
    setAuthError(result.error);
  }

    }
    return(
       <>
        {authError? <p>{authError}</p> : null}
        <form id="logonForm" onSubmit={handleSubmit} >
            <label className = "inputLabel"htmlFor="email">Email</label>
            <input type = "email"
                required
                id = "email"
                className="inputLogon"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <label className= "inputLabel" htmlFor="password">Password</label>
            <input type = "password" 
                required
                id="password" 
                className="inputLogon"
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button 
                type="submit" 
                disabled={isLoggingOn}
                id ="logonButton">
                {isLoggingOn? "Logging in" : "Logon"}
  
            </button>
        </form>
        </>
    )
}
export default Logon;