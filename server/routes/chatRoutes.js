const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getChats, updateChats } = require('../controllers/chatController');

router.get('/getchat',auth, getChats);

router.post('/updatechat', auth, updateChats)

module.exports =  router;