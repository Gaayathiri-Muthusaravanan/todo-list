import { useRef,useState} from "react";

import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";
function TodoForm({ onAddTodo })
{ 
    const inputRef = useRef();
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
     const handleAddTodo = (event) => {
        event.preventDefault();

       
            onAddTodo( workingTodoTitle);
            setWorkingTodoTitle("");
           
            inputRef.current.focus();
       
    };

    return( 
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel 
                elementId="todoTitle"
                labelText="Todo"
                value = {workingTodoTitle}
                ref={inputRef}
                onChange={(e)=>setWorkingTodoTitle(e.target.value)}
                />
            
           
            <button id = "addTodoButton" type="submit" disabled = {!isValidTodoTitle(workingTodoTitle)} >
                Add Todo
            </button>
        </form>
    ); 
} 
export default TodoForm;