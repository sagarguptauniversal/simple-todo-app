const Todo = require('./models/Todo'); // Import our new Model

// 1. IMPORTING TOOLS
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // <-- Added Mongoose
require('dotenv').config(); // <-- Added dotenv to read our .env file

// 2. INITIALIZING THE APP
const app = express();
const PORT = process.env.PORT || 5000; // <-- Now uses the port from .env

// 3. MIDDLEWARE
app.use(cors()); 
app.use(express.json()); 

// 4. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI, {
    family: 4 // This forces Node to use IPv4, bypassing the querySrv bug!
})
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ MongoDB Connection Failed:", err));

// ==========================================
// API ROUTES
// ==========================================

// 1. CREATE: Add a new To-Do (POST Request)
app.post('/api/todos', async (req, res) => {
    try {
        // req.body contains the data sent from the user
        const newTodo = new Todo({
            task: req.body.task
        });
        
        // Save it to MongoDB
        const savedTodo = await newTodo.save();
        
        // Send the saved item back as a success response
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }
});

// 2. READ: Get all To-Dos (GET Request)
app.get('/api/todos', async (req, res) => {
    try {
        // Find all items in the database
        const todos = await Todo.find(); 
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// 6. STARTING THE SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});