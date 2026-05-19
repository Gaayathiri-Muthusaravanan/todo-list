import { useState, useEffect } from 'react';
import '../../App.css';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';
function TodosPage({token}){
const[todoList, setTodoList] = useState([]);
const [error, setError] = useState("");
const [isTodoListLoading, setIsTodoListLoading] = useState(false);
useEffect(()=>{
  async function fetchTodos(){
     setIsTodoListLoading(true);
      try{
          const response = await fetch('/api/tasks', {
                method: 'GET',
                headers: { 'X-CSRF-TOKEN' : token },
                credentials: 'include'
          });
          if(response.status=== 401){
            throw new Error("Unauthorized")
          }
          if(!response.ok){
            throw new Error("response not ok")
          }
          const data =await response.json();
          setTodoList(data.tasks);
      }
      catch(error){
        setError(error.message);
      }
      finally{
        setIsTodoListLoading(false);
      }
    }
  fetchTodos();
},[token]);

    const addTodo = (todoTitle) => {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((prev) => [newTodo, ...prev]);
  };
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
    return(
     <div id="appContainer">
      <div id ="appHeading" >
        
        <h1>TO-DO LIST</h1>
      </div>
      <div><TodoForm onAddTodo = {addTodo}/></div>
      <div><TodoList todoList={todoList} onCompleteTodo ={completeTodo} onUpdateTodo = {updateTodo}/></div>
    </div>)
    
}

export default TodosPage