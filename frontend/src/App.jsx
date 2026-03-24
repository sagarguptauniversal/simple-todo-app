import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch To-Dos on load
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Add a new To-Do
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTask) return;

    axios.post('http://localhost:5000/api/todos', { task: newTask })
      .then(response => {
        setTodos([...todos, response.data]); 
        setNewTask('');
      })
      .catch(error => console.error("Error adding task:", error));
  };

  // NEW: Delete a To-Do
  const deleteTodo = (id) => {
    // 1. Tell the backend to delete it from the database
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        // 2. Update our React UI by filtering out the deleted item
        // This says: "Keep all todos EXCEPT the one with the ID we just deleted"
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => console.error("Error deleting task:", error));
  };

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      
      <form onSubmit={addTodo}>
        <input 
          type="text" 
          placeholder="Add a new task..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {todos.map((todo) => (
          // We use a CSS class to arrange the text and button nicely
          <li key={todo._id} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <span>{todo.task}</span>
            {/* NEW: The Delete Button */}
            <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: '15px', color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;