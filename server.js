const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authRoutes = require('./server/routes/auth');
const todoRoutes = require('./server/routes/todos.js');

const app = express();
//app.use(cors());
app.use(cors({ origin: 'https://mean-to-do.com/' }));
app.use(express.json());
//onst express = require('express');
//const mongoose = require('mongoose');
//onst cors = require('cors');

// Import routes
//const todoRoutes = require('./routes/todos');

// Initialize express app
//const app = express();

// Middleware
//app.use(cors()); // To allow cross-origin requests
//app.use(express.json()); // To parse JSON request bodies

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI; //|| 'mongodb+srv://smithant:MPLiGrYQjbfcgbq2@cluster0.dyxwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // API route for handling To-Do operations
app.use('/api/todos', todoRoutes);
// Simple home route
app.get('/', (req, res) => {
    res.send("Welcome to the To-Do App");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


