import TodoListItem from "./TodoListItem";
import '../../App.css';
function TodoList({todoList, onCompleteTodo, onUpdateTodo}){
    const filteredTodoList = todoList.filter((todo)=>!todo.isCompleted);

    return(
        filteredTodoList.length === 0 ? 
            (<p id="todoPara">Add todo above to get started</p>) :
            (<ul>
                { filteredTodoList.map(todo=>
                    <TodoListItem 
                        key = {todo.id} 
                        todo = {todo} 
                        onCompleteTodo = {onCompleteTodo}
                        onUpdateTodo={onUpdateTodo}
                    />
                )}
                
                 </ul>)
    );
}
export default TodoList;