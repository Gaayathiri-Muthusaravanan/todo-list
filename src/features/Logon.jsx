import { useState } from "react";

function Logon({onSetEmail, onSetToken}){
    const [email, setEmail] = useState("");
    const  [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [isLoggingOn, setIsLoggingOn] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoggingOn(true);
        setAuthError("");
        try{
            const response = await fetch('/api/users/logon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            const data =await response.json();
            if(response.status === 200 && data.name && data.csrfToken){
                onSetEmail(data.name);
                onSetToken(data.csrfToken);
            }
            else{
                setAuthError(`Authentication failed: ${data?.message}`);
            }
        }catch(error){
            setAuthError(`Error: ${error.name} | ${error.message}`);
        }finally{
            setIsLoggingOn(false);
        }

    }
    return(
        <>
        {authError? <p>{authError}</p> : null}
        <form onSubmit={handleSubmit} >
            <label htmlFor="email">Email</label>
            <input type = "email"
                    required
                    id = "email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input type = "password" 
                    required
                    id="password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
            />
            <button type="submit" disabled={isLoggingOn}>Logon
  
</button>
        </form>
        </>
    )
}
export default Logon;