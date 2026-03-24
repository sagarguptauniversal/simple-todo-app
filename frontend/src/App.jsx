import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // 1. STATE: This is React's memory. 
  // 'todos' holds our list of tasks. 'newTask' holds the text we type in the input box.
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  // 2. USEEFFECT: This runs automatically when the page first loads.
  // We use it to ask our backend for the existing To-Dos.
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => {
        setTodos(response.data); // Save the data from the backend into our 'todos' state
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []); // The empty array [] means "only run this once"

  // 3. ADD FUNCTION: This runs when we click the "Add" button.
  const addTodo = (e) => {
    e.preventDefault(); // Stops the page from refreshing when we submit the form
    if (!newTask) return; // If the input is empty, do nothing

    // Send a POST request to our backend with the new task
    axios.post('http://localhost:5000/api/todos', { task: newTask })
      .then(response => {
        // Add the brand new task to our existing list of tasks
        setTodos([...todos, response.data]); 
        setNewTask(''); // Clear out the input box
      })
      .catch(error => console.error("Error adding task:", error));
  };

  // 4. THE UI (JSX): This looks like HTML, but it's actually JavaScript!
  return (
    <div className="App">
      <h1>My To-Do List</h1>
      
      {/* The Input Form */}
      <form onSubmit={addTodo}>
        <input 
          type="text" 
          placeholder="Add a new task..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // Updates 'newTask' as we type
        />
        <button type="submit">Add Task</button>
      </form>

      {/* The List of Tasks */}
      <ul>
        {/* We 'map' (loop) through our todos array and create an <li> for each one */}
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;