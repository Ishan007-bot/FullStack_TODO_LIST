const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks.controllers');
const router = express.Router();

router.get('/', getTasks);


router.post('/', createTask);


router.patch('/:id', updateTask);


router.delete('/:id', deleteTask);

module.exports = router;
