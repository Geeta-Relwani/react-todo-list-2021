import { func } from 'prop-types';
import React from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")

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

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setTodo(e.target.value)} value={todo}/>
        <button type='submit'>Add Todo</button>
      </form>
      {todos.map( (todo) => <div>{todo.text}</div>)}
    </div>
  );
}

export default App;
