const Chat = require('../models/Chat');

exports.getChats = async (req, res) => {
  const { spaceId } = req.query;
  try {
    const chatDoc = await Chat.findOne({ spaceId }).populate('chats.user', 'fullName').populate('spaceId');
    res.status(200).json({ chats: chatDoc || { chats: [] } });
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateChats = async (req, res) => {
  const { spaceId, allMessages } = req.body;
  try {
    const formattedMessages = allMessages.map(msg => ({
      message: msg.message,
      user: msg.user._id || msg.userId
    }));

    const chat = await Chat.findOneAndUpdate(
      { spaceId },
      { chats: formattedMessages },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, chat });
  } catch (error) {
    console.error('Error updating chats:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
