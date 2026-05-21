import { useState, useEffect } from 'react';
import '../../App.css';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';
function TodosPage({token}){
const[todoList, setTodoList] = useState([]);
const [error, setError] = useState("");
const [isTodoListLoading, setIsTodoListLoading] = useState(false);
useEffect(()=>{
  if (!token) return;
  async function fetchTodos(){
     setIsTodoListLoading(true);
     setError("");
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
    try{
      const response = await fetch(`/api/tasks`,{
        method : 'POST',
        body : JSON.stringify({
          title : todoTitle,
          isCompleted : false,
        }),
        headers : {
          'Content-Type' : 'application/json',
          'X-CSRF-TOKEN' : token,
        },
        credentials : 'include',

      })
      if(!response.ok)
      {
        throw new Error("Failed to add");
      }

      const data = await response.json();
      setTodoList( previous =>
                      previous.map(todo=>
                        todo.id === tempTodo.id ? data : todo
                      )
      );
      
    }catch(error){
       setError(error.message);
    }
  
   console.log(tempTodo);
    
  };


//Complete Todo
const completeTodo = async(id) => {
  const originalTodo = todoList.find(todo => todo.id === id);
  const updatedTodo = todoList.map(todo =>
      todo.id === id
        ? { ...todo, isCompleted: true }
        : todo
  );
  setTodoList(updatedTodo);
  try{
      const response = await fetch(`/api/tasks/${id}`,{
          method : 'PATCH',
          headers : {
            'Content-Type' : 'application/json',
            'X-CSRF-TOKEN' : token,
          },
          body : JSON.stringify({
            title : originalTodo.title,
            isCompleted : true,

          }),
      })
      if(!response.ok){
          throw new Error("Failed to complete todo");
      }
    }catch(error){
      setTodoList((previous)=>
                    previous.map((todo)=>
                      todo.id === id ? originalTodo : todo )
      )
      setError(error.message);
    }
}

//Update Todo Functionality
const updateTodo = async(editedTodo) =>{
  const originalTodo = todoList.find(todo => todo.id === editedTodo.id);
  console.log(originalTodo)
  const updatedTodos = todoList.map((todo)=>
       todo.id === editedTodo.id ? editedTodo : todo);
  setTodoList(updatedTodos);
  try{
    const response = await fetch(`/api/tasks/${editedTodo.id}`,{
      method : 'PATCH',
      body : JSON.stringify({
          title : originalTodo.title,
          isCompleted : true,
      }),
      credentials : 'include',
      headers : {
          'Content-Type' : 'application/json',
          'X-CSRF-TOKEN' : token,
      }, 
    })
    if(!response.ok){
      throw new Error("FAiled to update todo");
    }
  }catch(error){
    setTodoList((previous)=>
            previous.map((todo)=>
                todo.id === originalTodo ? originalTodo : todo));
  }

}
    return(
      <>
        {isTodoListLoading && (<p>Loading todos</p>)}
        {error && (<p>{error}</p>)}
        <div id="appContainer">
          <div><TodoForm onAddTodo = {addTodo}/></div>
          <div><TodoList todoList={todoList} onCompleteTodo ={completeTodo} onUpdateTodo = {updateTodo}/></div>
        </div>
      </>
    )
}

export default TodosPage