const mongoose = require('mongoose');

const chatSchema  = new mongoose.Schema({
    spaceId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'VirtualSpace',
        required : true
    },
    chats: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            message: {
                type: String,
                required: true,
                trim: true,
                minlength: [1, 'Message cannot be empty'],
                maxlength: [500, 'Message cannot exceed 500 characters']
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;