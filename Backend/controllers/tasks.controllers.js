const Task = require('../models/tasks');

// GET /tasks?category=work
exports.getTasks = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// POST /tasks
exports.createTask = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const task = await Task.create({
            userId: req.user ? req.user._id : null, // You may want to set userId from auth middleware
            title,
            description,
            category
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// PATCH /tasks/:id
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const task = await Task.findByIdAndUpdate(id, update, { new: true });
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json({ msg: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
