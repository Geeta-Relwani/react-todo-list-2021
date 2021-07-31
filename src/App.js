import React from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")
  const [todoEditing, setTodoEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState("")

  React.useEffect(() => {
    const temp = localStorage.getItem(todos)
    const loadedTodos = JSON.parse(temp);
    if(loadedTodos){
      setTodos(loadedTodos)
    }
  }, []);

  React.useEffect(()=>{
    const temp = JSON.stringify(todos);
    localStorage.setItem('todos',temp);
  },[todos])

  function handleSubmit(e){
    e.preventDefault();

    // create a new todo
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed : false,
    }

    //add new todo to the todo list

    setTodos([...todos].concat(newTodo))

    //reset input to blank
    setTodo("")
  }

  // deletes todo
  function deleteTodo(id){
    const updatedTodos = [...todos].filter((todo)=> todo.id !== id);
    setTodos(updatedTodos);
  }

  // toggle to mark todo as complete or incomplete
  function toggleComplete(id){
    const updatedTodos = [...todos].map((todo)=> {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos);
  }

  //on submit of edited todo
function editTodo(id){
  const updatedTodos = [...todos].map((todo)=> {
    if(todo.id === id){
      todo.text = editingText
    }
    return todo
  })
  setTodos(updatedTodos)
  setTodoEditing(null) // id of edited todo
  setEditingText('')// input value null
}

  return (
    <div id="todo-list">
    <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setTodo(e.target.value)} value={todo}/>
        <button type='submit'>Add Todo</button>
      </form>
      {todos.map( (todo) => <div  key={todo.id} className="todo">
      <div className="todo-text">

      <input type ='checkbox' 
      onChange={()=> toggleComplete(todo.id)} 
      checked = {todo.completed}/>

        {
          todoEditing === todo.id? 
          (
            <input type='text' onChange={(e)=> setEditingText(e.target.value)} value={editingText}/>
          ) : (
            <div>{todo.text}</div>
          )
        }
      
      </div>
      
      <div className="todo-actions">

      { todoEditing === todo.id? 
      ( <button onClick ={()=> editTodo(todo.id)}>Submit Edits</button>) : 
      (<button onClick = {()=> setTodoEditing(todo.id)}>Edit todo</button>)}
      </div>
     
      <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
      </div> 
      )}
    </div>
  );
}

export default App;
