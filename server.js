const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authRoutes = require('./server/routes/auth.js');
const todoRoutes = require('./server/routes/todos.js');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/todoapp', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

