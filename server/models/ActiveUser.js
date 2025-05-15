const mongoose = require('mongoose');

// Define the schema for the ActiveUsers collection
const activeUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true
  },
  socketId: {
    type: String,
    required: true
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VirtualSpace', // Reference to the VirtualSpace collection
    required: true
  },
  position: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create the ActiveUser model
const ActiveUser = mongoose.model('ActiveUser', activeUserSchema);

module.exports = ActiveUser;
