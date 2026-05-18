import { useState } from 'react';
import './App.css';
import todoImg from './assets/todo.jpeg'
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';

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
    const updateTodo = (editedTodo) =>{
      const updatedTodos = todoList.map((todo)=>
      {
        if(todo.id === editedTodo.id){
          return {...editedTodo};
        }
        return todo;
      });
      setTodoList(updatedTodos);
    }
    
 
  return (
    <div id="appContainer">
      <div id = "appHeading">
        <img src={todoImg} id ="todoImage" alt="todo" />
        <h1>TO-DO LIST</h1>
      </div>
      <div><TodoForm onAddTodo = {addTodo}/></div>
      <div><TodoList todoList={todoList} onCompleteTodo ={completeTodo} onUpdateTodo = {updateTodo}/></div>
    </div>
  );
}

export default App
