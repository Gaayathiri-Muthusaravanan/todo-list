import { useRef, useState } from "react";
import styles from '../../css/TodosPage.module.css';
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";
import { sanitizeInput } from "../../utils/sanitize";
function TodoForm({ onAddTodo }) {
    const inputRef = useRef();
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    const handleAddTodo = (event) => {
        event.preventDefault();
        const cleanTitle = sanitizeInput(workingTodoTitle);
        onAddTodo(cleanTitle);
        setWorkingTodoTitle("");

        inputRef.current.focus();

    };

    return (
        <form onSubmit={handleAddTodo} >
            <TextInputWithLabel
                elementId="todoTitle"
                labelText="Todo"
                value={workingTodoTitle}
                ref={inputRef}
                onChange={(e) => setWorkingTodoTitle(e.target.value)}
            />


            <button className={styles.addTodoButton} type="submit" disabled={!isValidTodoTitle(workingTodoTitle)} >
                Add Todo
            </button>
        </form>
    );
}
export default TodoForm;