const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const crypto = require('crypto');
const axios = require('axios'); // Added for making HTTP requests
const model = require('./routes/models/model');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/new_hackathon', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// MongoDB connection events
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

// Request Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Compression
app.use(compression());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const formRouter = require('./routes/form');
const dashboardRouter = require('./routes/dashboard');
const profileRouter = require('./routes/profile');
const saveProfileRouter = require('./routes/save-profile');
const uploadImageRouter = require('./routes/upload-image');

// Use routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/form', formRouter);
app.use('/dashboard', dashboardRouter);
app.use('/profile', profileRouter);
app.use('/save-profile', saveProfileRouter);
app.use('/upload-image', uploadImageRouter);

// Middleware for token verification
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'secret_key', (err, authData) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    res.status(401).json({ error: 'Invalid token' });
                } else {
                    res.status(403).json({ error: 'Forbidden' });
                }
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

// Protect routes with token verification middleware
app.use('/dashboard', verifyToken);

// Route for fetching user details from MongoDB
app.get('/userDetails', (req, res) => {
    // Assuming the user's model is named 'User'
    const User = mongoose.model('User');

    // Fetch user's details, for simplicity assuming user ID is 1
    User.findOne({ id: 1 }, (err, user) => {
        if (err) {
            console.log("Error occurred while fetching user details");
            res.status(500).send('Internal Server Error');
        } else {
            res.json(user); // Send user details as JSON response
        }
    });
});

// Route for uploading a file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const result = await model(imagePath, "model_classifier.pkl");
    res.render('result', { result }); // Assuming you have a result page to display the prediction result
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing image');
  }
});

// Error handling middleware for routes not found (404)
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// Error handling middleware for invalid JSON payload
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).send('Bad request: invalid JSON payload');
    } else {
        next();
    }
});

// Error handling middleware (placed at the end)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Graceful Shutdown
process.on('SIGINT', async () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
});

const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
