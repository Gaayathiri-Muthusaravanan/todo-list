import Header from "./shared/Header";
import TodosPage from "./features/Todos/Todospage";
import Logon from "./features/Logon";
import {  useState } from "react";

import { useAuth } from "./contexts/AuthContext";
function App() {
 
 const { isAuthenticated ,token} = useAuth();
 console.log("AUTH STATE:", { isAuthenticated, token });
  return (
   <>
    <Header/>
    
    {isAuthenticated?
      <TodosPage /> :
      <Logon  />
    }
    
   </>
  );
}

export default App
