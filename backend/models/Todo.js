const mongoose = require('mongoose');

// 1. Define the Blueprint (Schema)
const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true // A To-Do must have a task!
    },
    completed: {
        type: Boolean,
        default: false // By default, a new task is not finished
    }
});

// 2. Export the Model so our server can use it
module.exports = mongoose.model('Todo', todoSchema);