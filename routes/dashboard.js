const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const path = require('path');

// Dashboard route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
});

// Logout route
router.get('/logout', (req, res) => {
    // Clear session and token
    req.session.destroy();
    res.clearCookie('token');
    // Redirect to login page
    res.redirect('/login');
});

module.exports = router;
