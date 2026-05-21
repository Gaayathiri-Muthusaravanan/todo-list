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
          console.log(data);
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


//Add Todo
    const addTodo = async(todoTitle) => {
    const tempTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };
    setTodoList((prev) => [tempTodo, ...prev]);
  
    const response = await fetch('/api/tasks',{
      method: 'POST',
      body : JSON.stringify({
        title : todoTitle,
        isCompleted: false
      }),
      headers: {
        'Content-Type' : 'application/json',
        'X-CSRF-TOKEN' : token
      },
      credentials: 'include'
    })
    if(!response.ok){
      throw new Error("Failed to add todo");
    }
    const realTodo = await response.json();
    console.log(realTodo);
    setTodoList(previous=>
      previous.map((todo)=>
    todo.id=== tempTodo.id? realTodo:todo));
    
  };


  //Complete Todo

    const completeTodo = async(id) => {
      const updatedTodo = todoList.map((todo) =>
      {
        if(todo.id === id){
          return {...todo,isCompleted:true};
        }
        return todo;
      });
      
      setTodoList(updatedTodo);
      try{
        const response = await fetch("/api/tasks/${id}",{
          method: 'PATCH',
          body : JSON.stringify({
            isCompleted: true
          }),
          headers: {
            'Content-Type' : 'application/json',
            'X-CSRF-TOKEN' : token
          }
        })
        if(!response.ok){
          throw new Error("Failed to complete task");
        }
      }catch(error){
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === id ? originalTodo : todo
        ));
        setError("Failed to complete todo");
      }
    }



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
      <div><TodoForm onAddTodo = {addTodo}/></div>
      <div><TodoList todoList={todoList} onCompleteTodo ={completeTodo} onUpdateTodo = {updateTodo}/></div>
    </div>)
    
}

export default TodosPage