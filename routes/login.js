const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('./models/User'); // Make sure the path and filename are correct

// Serve login page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

// Handle login
router.post('/login', async (req, res) => {
    // Extract username and password from request body
    const { username, password } = req.body;

    try {
        // Find user in the database based on username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare hashed password with the provided password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If user is found and password is valid, you can perform additional logic here
        // For example, generate and send JWT token for authentication
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
