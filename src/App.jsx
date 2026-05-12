import { useState } from 'react';
import './App.css'

import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoList/ToDoForm';

function App() {
  const[todoList, setTodoList] = useState([]);
  const addTodo = (todoTitle) =>{
    const newTodo = {
      id : Date.now(),
      title : todoTitle,
      isCompleted : false
    };
   
    setTodoList(previous => [newTodo, ...previous])
     
    }
     const completeTodo = (id) => {
      const updatedTodo = todoList.map((todo) =>
      {
        if(todo.id === id){
          return {...todo,isCompleted:true};
        }
        return todo;
      } );
       setTodoList(updatedTodo);
    };
  
 
  return (
    <div>
      <h1>ToDo List</h1>
      <TodoForm onAddTodo = {addTodo}/>
      <TodoList todoList={todoList} onCompleteTodo ={completeTodo}/>
    </div>
  );
}

export default App
