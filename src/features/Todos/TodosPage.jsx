import { useState, useEffect, useCallback } from 'react';
import '../../App.css';
import SortBy from '../../shared/SortBy';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';
import FilterInput from '../../shared/FilterInput';
import { useDebounce } from '../../utils/useDebounce';
function TodosPage({token}){

const[todoList, setTodoList] = useState([]);
const [error, setError] = useState("");
const [isTodoListLoading, setIsTodoListLoading] = useState(false);

const [sortBy, setSortBy] = useState('creationDate');
const [sortDirection, setSortDirection] = useState('desc');

const [filterTerm, setFilterTerm] = useState('');
const debouncedFilterTerm = useDebounce(filterTerm, 300);

const [dataVersion, setDataVersion] = useState(0);

const [filterError, setFilterError] = useState("");
const invalidateCache = useCallback(() => {
  setDataVersion(prev => prev + 1);
  console.log("Invalidating memo cache after todo mutation");
},[]);
const handleFilterChange = (newTerm) => { setFilterTerm(newTerm); };

useEffect(()=>{
  if (!token) return;
  async function fetchTodos(){
     setIsTodoListLoading(true);
     setError("");
      try{
        const paramsObject = {
            sortBy,
            sortDirection,
        };
        if (debouncedFilterTerm) {
            paramsObject.find = debouncedFilterTerm;
        }
        const params = new URLSearchParams(paramsObject);
        const response = await fetch(`/api/tasks?${params}`, {
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
          setFilterError(''); 
      }
      catch(error){
        setError(error.message);
        if (debouncedFilterTerm || sortBy !== 'creationDate' || sortDirection !== 'desc') {
          setFilterError(`Error filtering/sorting todos: ${error.message}`);
        } else {
          setError(`Error fetching todos: ${error.message}`);
        }
      }
      finally{
        setIsTodoListLoading(false);
      }
    }
  fetchTodos();
},[token,sortBy,sortDirection, debouncedFilterTerm]);

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
      invalidateCache();
      
    }catch(error){
       setTodoList( previous =>
                      previous.filter(todo=>
                        todo.id !== tempTodo.id 
                      )
      );
       setError(error.message);
    }    
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
          credentials : 'include',
      })
      if(!response.ok){
          throw new Error("Failed to complete todo");
      }
      invalidateCache();
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
  
  const updatedTodos = todoList.map((todo)=>
       todo.id === editedTodo.id ? editedTodo : todo);
  setTodoList(updatedTodos);
  try{
    const response = await fetch(`/api/tasks/${editedTodo.id}`,{
      method : 'PATCH',
      body : JSON.stringify({
          title : editedTodo.title,
          isCompleted : editedTodo.isCompleted,
      }),
      credentials : 'include',
      headers : {
          'Content-Type' : 'application/json',
          'X-CSRF-TOKEN' : token,
      }, 
    })
    if(!response.ok){
      throw new Error("Failed to update todo");
    }
    invalidateCache();
  }catch(error){
    setTodoList((previous)=>
            previous.map((todo)=>
                todo.id === originalTodo.id ? originalTodo : todo));
    setError(error.message);
  }
  

}
    return(
      <>
        {isTodoListLoading && (<p>Loading todos</p>)}
        {error && (<>
          <p>{error}</p>
          <button onClick={() => setError("")}>Clear Error</button></>
        )}
        {filterError && 
          (<div>
            <p>{filterError}</p>
            <button onClick={() => setFilterError('')}>Clear Filter Error</button>

            <button
              onClick={() => {
                setFilterTerm('');
                setSortBy('creationDate');
                setSortDirection('desc');
                setFilterError('');
              }}>
              Reset Filters
            </button>
          </div>)
        }
        <div id="appContainer">
          <div><SortBy sortBy={sortBy} sortDirection = {sortDirection} onSortByChange={setSortBy} onSortDirectionChange = {setSortDirection}/></div>
          <div><FilterInput filterTerm = {filterTerm} onFilterChange = {handleFilterChange}/></div>
          <div><TodoForm onAddTodo = {addTodo}/></div>
          <div><TodoList 
            todoList={todoList} 
            onCompleteTodo ={completeTodo} 
            onUpdateTodo = {updateTodo} 
            dataVersion={dataVersion}
            todoList={todoList}/>
          </div>
        </div>
      </>
    )
}

export default TodosPage