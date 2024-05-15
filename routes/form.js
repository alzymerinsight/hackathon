const express = require('express');
const router = express.Router();
const User = require('./models/User');

// Route for handling form submissions
router.post('/register', async (req, res) => {
    try {
        const { fullName, username, email, phoneNumber, password, confirmPassword, image, gender } = req.body;
        // console.log(req.body)
        // // Check if passwords match
        // if (password !== confirmPassword) {
        //     return res.status(400).json({ error: 'Passwords do not match' });
        // }

        // // Create a new user instance
        // const user = new User({
        //     fullName : fullName,
        //     username :username,
        //     email : email,
        //     phoneNumber : phoneNumber,
        //     password : password,
        //     image : image,
        //     gender :gender
        // });

        // // Save the user to the database
        // await user.save();

        res.status(200).json({ message: "Submitted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
