const express = require('express');
const router = express.Router();
const path = require('path');

// Redirect index page to index.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;
