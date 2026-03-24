// 1. IMPORTING TOOLS
const express = require('express');
const cors = require('cors');

// 2. INITIALIZING THE APP
const app = express();
const PORT = 5000; // The "door" our server will listen on

// 3. MIDDLEWARE (Setting up the rules)
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Allow our app to understand JSON data sent in requests

// 4. CREATING A ROUTE (Our first API endpoint)
// When someone visits our base URL (the '/'), send them this message
app.get('/', (req, res) => {
    res.send("Hello from the Backend Server!");
});

// 5. STARTING THE SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});