const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');
const auth = require('../middleware/auth');

// Middleware to attach socket.io
router.use((req, res, next) => {
  req.io = req.app.get('io');
  next();
});

// Protected routes with JWT authentication
router.post('/create', auth, spaceController.createSpace);
router.post('/join', auth, spaceController.joinSpace);
router.get('/allspaces', auth, spaceController.getAllSpaces);
router.get('/getspace', auth, spaceController.getSpace);
router.post('/updatespace', auth, spaceController.updateSpace);

module.exports = router;