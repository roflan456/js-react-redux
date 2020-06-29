import React, { useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./Context";
import { func } from "prop-types";
import Loader from "./Loader";
import Modal from "./Modal/Modal";


function App () {
  
  const [todos, setTodos] = React.useState([
    {id:1, completed:'false', title:'Buy bread'},
    {id:2, completed:'false', title:'Buy milk'},
    {id:3, completed:'false', title:'Buy cheese'}
  ])

  const [loader, setLoader] = React.useState(true)

  const AddTodo = React.lazy(() => new Promise(resolve => 
    { 
      setTimeout(() => resolve(import('./Todo/AddTodo')),1000)
       
      })  )

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(response => response.json())
  .then(todos => {
    setTimeout( () =>{
      setTodos(todos)
      setLoader(false)
    },3000
    )
  })
  }, [])

  function toggleTodo(id){
    setTodos (
      todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
    }
        return todo
    })
    )
  }

  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title){
    setTodos(
      todos.concat([{
        id:Date.now(),
        title:title,
        completed:false
      }])
    )

  }

  return (
    <Context.Provider value ={{removeTodo} }>
      <div className='wrapper'>
          <h1 style={{textAlign:'center'}}>Food list</h1>
          <Modal/>
          <React.Suspense className='loading' fallback={<p>    Loading...</p>}>
          <AddTodo onCreate={addTodo}/>
          </React.Suspense>
          {loader && <Loader/> }
         {todos.length ? <TodoList todos={todos} onToggle={toggleTodo}/> :
         loader ? null : <p style={{justifyContent:'center', margin:'.5rem'}}>No list!</p>}
      </div>
      </Context.Provider>
  )
};

export default App;
