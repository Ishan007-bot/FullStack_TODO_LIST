const express = require('express');
const { register, login, logout } = require('../controllers/auth.controllers');
const router = express.Router();

// POST /auth/register
router.post('/register', register);

// POST /auth/login
router.post('/login', login);

// POST /auth/logout
router.post('/logout', logout);

module.exports = router;
