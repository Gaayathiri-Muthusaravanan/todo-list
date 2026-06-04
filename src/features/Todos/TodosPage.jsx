import {  useEffect, useCallback } from 'react';
import '../../App.css';
import SortBy from '../../shared/SortBy';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';
import FilterInput from '../../shared/FilterInput';
import { useDebounce } from '../../utils/useDebounce';
import { useReducer } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../../reducers/todoReducer';

function TodosPage(){

   const { token } = useAuth();
const [state, dispatch] = useReducer(
  todoReducer,
  initialTodoState
);
const {
  todoList,
  error,
  filterError,
  isTodoListLoading,
  sortBy,
  sortDirection,
  filterTerm,
  dataVersion,
} = state;
const debouncedFilterTerm = useDebounce(filterTerm, 300);
const invalidateCache = useCallback(() => {
  dispatch({
    type : TODO_ACTIONS.INVALIDATE_CACHE,
  })
  
},[dataVersion]);
const handleFilterChange = (newTerm) => { 
   dispatch({
    type: TODO_ACTIONS.SET_FILTER,
    payload: {
      filterTerm: newTerm,
    },
  });
 };

useEffect(()=>{
  if (!token) return;
  async function fetchTodos(){
    dispatch({
      type: TODO_ACTIONS.FETCH_START,
    });
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
          const todos = await response.json();
          
          dispatch({
            type: TODO_ACTIONS.FETCH_SUCCESS,
            payload: { 
              todos : todos.tasks,
            },

          });

          
      }
      catch(error){
        dispatch({
  type: TODO_ACTIONS.FETCH_ERROR,
  payload: {
    message: `Error fetching todos: ${error.message}`,
    isFilterError: false,
  },
});
      }
      finally{
        //setIsTodoListLoading(false);
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
    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: {tempTodo}
    });
    
    
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
      
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempId: tempTodo.id,
          savedTodo: data,
        },
      });
      invalidateCache();
      
    }catch(error){
       
       dispatch({
      type: TODO_ACTIONS.ADD_TODO_ERROR,
      payload: {
        tempId: tempTodo.id,
        message: error.message,
      },
    });
       
    }    
  };


//Complete Todo
const completeTodo = async(id) => {
  const originalTodo = todoList.find(todo => todo.id === id);
  dispatch({
    type: TODO_ACTIONS.COMPLETE_TODO_START,
    payload: {
      id,
    },
  });
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
       dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
      payload: { id },
    });
      invalidateCache();
    }catch(error){
      dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
      payload: {
        originalTodo,
        message: error.message,
      },
    });
    }
}

//Update Todo Functionality
const updateTodo = async(editedTodo) =>{
  const originalTodo = todoList.find(todo => todo.id === editedTodo.id);
  dispatch({
    type: TODO_ACTIONS.UPDATE_TODO_START,
    payload: {
      editedTodo,
    },
  });
  
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
    dispatch({
    type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
    payload: {
      originalTodo,
    },
  });
    invalidateCache();
  }catch(error){
   dispatch({
    type: TODO_ACTIONS.UPDATE_TODO_ERROR,
      payload: {originalTodo,
      message: error.message},
   })
  }
  

}
    return(
      <>
        {isTodoListLoading && (<p>Loading todos</p>)}
        {error && (<>
          <p>{error}</p>
          <button onClick={() => 
            dispatch({
              type: TODO_ACTIONS.CLEAR_ERROR,
            })}>
          Clear Error
          </button>

      </>
        )}
        {filterError && 
          (<div>
            <p>{filterError}</p>
            <button onClick={() => 
            dispatch({
              type: TODO_ACTIONS.CLEAR_ERROR,
            })}>Clear Filter Error</button>

            <button
             onClick={() =>
        dispatch({
          type: TODO_ACTIONS.RESET_FILTERS,
        })
      }
             >
              Reset Filters
            </button>
          </div>)
        }
        <div id="appContainer">
          <div><SortBy 
            sortBy={sortBy} 
            sortDirection = {sortDirection} 
             onSortByChange={(newSortBy) =>
    dispatch({
      type: TODO_ACTIONS.SET_SORT,
      payload: {
        sortBy: newSortBy,
        sortDirection,
      },
    })
  }
  onSortDirectionChange={(newDirection) =>
    dispatch({
      type: TODO_ACTIONS.SET_SORT,
      payload: {
        sortBy,
        sortDirection: newDirection,
      },
    })
  }/>
          </div>
          <div><FilterInput filterTerm = {filterTerm} onFilterChange = {handleFilterChange}/></div>
          <div><TodoForm onAddTodo = {addTodo}/></div>
          <div><TodoList 
            todoList={todoList} 
            onCompleteTodo ={completeTodo} 
            onUpdateTodo = {updateTodo} 
            dataVersion={dataVersion}
            />
          </div>
        </div>
      </>
    )
}

export default TodosPage