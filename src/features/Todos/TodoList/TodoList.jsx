import { useMemo } from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, dataVersion, statusFilter = 'all', filterTerm = '' }) {

  const filteredTodoList = useMemo(() => {


    let filteredTodos;
    switch (statusFilter) {
      case 'completed':
        filteredTodos = todoList.filter((todo) => todo.isCompleted);
        break;
      case 'active':
        filteredTodos = todoList.filter((todo) => !todo.isCompleted);
        break;
        
      default:
        filteredTodos = todoList;
        break;
    }
    if (filterTerm.trim() !== '') {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.title.toLowerCase().includes(filterTerm.toLowerCase())
      );
    }
    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [dataVersion, todoList, statusFilter, filterTerm]);
  const getEmptyMessage = () => {
    if (filterTerm.trim() !== '') {
      return 'No todos match your search.';
    }

    switch (statusFilter) {
      case 'completed':
        return 'No completed todos yet. Complete some tasks to see them here.';
      case 'active':
        return 'No active todos. Add a todo above to get started.';
      case 'all':
      default:
        return 'Add todo above to get started.';
    }
  };

  return (
    filteredTodoList.todos.length === 0 ?
      <p>{getEmptyMessage()}</p> :
      (<ul>
        {filteredTodoList.todos.map(todo =>
          <TodoListItem
            key={todo.id}
            todo={todo}
            onCompleteTodo={onCompleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        )}

      </ul>)
  );
}
export default TodoList;