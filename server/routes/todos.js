const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('./../models/todo');

const router = express.Router();
//const express = require('express');
//const router = express.Router();
//const Todo = require('../models/Todo');

// Create a new To-Do item
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};

// Get all to-dos
router.get('/', authenticate, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

// Create to-do
router.post('/', authenticate, async (req, res) => {
  const { task } = req.body;
  const newTodo = new Todo({ userId: req.userId, task });
  await newTodo.save();
  res.json(newTodo);
});

// Update to-do
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { task, completed }, { new: true });
  res.json(todo);
});

// Delete to-do
router.delete('/:id', authenticate, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'To-do deleted' });
});

module.exports = router;
