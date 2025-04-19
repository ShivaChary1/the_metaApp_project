const mongoose = require('mongoose');

const virtualSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Space name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  password: {
    type: String,
    default: null // Null for public spaces, string for password-protected
  },
  maxUsers: {
    type: Number,
    required: [true, 'Maximum number of users is required'],
    min: [1, 'Maximum users must be at least 1'],
    max: [100, 'Maximum users cannot exceed 100'],
    default: 50
  },
  currentUsers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    position: {
      x: {
        type: Number,
        required: true,
        min: [0, 'X position cannot be negative']
      },
      y: {
        type: Number,
        required: true,
        min: [0, 'Y position cannot be negative']
      }
    }
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying by name
virtualSpaceSchema.index({ name: 1 });

module.exports = mongoose.model('VirtualSpace', virtualSpaceSchema);