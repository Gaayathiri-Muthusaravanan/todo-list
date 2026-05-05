import { useState } from 'react';
import './App.css'

import TodoList from './TodoList';
import TodoForm from './ToDoForm';

function App() {
  const[todoList, setTodoList] = useState([]);
  const addTodo = (todoTitle) =>{
    const newTodo = {
      id : Date.now(),
      title : todoTitle
    };
    setTodoList(previous => [newTodo, ...previous])
  }
  return (
    <div>
      <h1>ToDo List</h1>
      <TodoForm onAddTodo = {addTodo}/>
      <TodoList todoList={todoList}/>
    </div>
  );
}

export default App
