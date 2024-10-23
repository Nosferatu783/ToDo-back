const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('./../models/todo.js');

const router = express.Router();
//const express = require('express');
//const router = express.Router();
//const Todo = require('../models/Todo');

// Create a new To-Do item
router.post('/', async (req, res) => {
    const { task, completed } = req.body;
    try {
        const newTodo = new Todo({
            task,
            completed: completed || false // Default to false if not provided
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({ message: "Failed to create a to-do item", error: err.message });
    }
});

// Read all To-Do items for a specific user
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch to-do items", error: err.message });
    }
});

// Update a To-Do item (by id)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { task, completed },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: "To-Do item not found" });
        }
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: "Failed to update to-do item", error: err.message });
    }
});

// Delete a To-Do item (by id)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "To-Do item not found" });
        }
        res.status(200).json({ message: "To-Do item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete to-do item", error: err.message });
    }
});

module.exports = router;
