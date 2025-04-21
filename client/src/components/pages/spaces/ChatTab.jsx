import React from 'react';
import PropTypes from 'prop-types';

const ChatTab = ({
  chatMessages,
  newMessage,
  setNewMessage,
  isPrivateChat,
  setIsPrivateChat,
  handleSendMessage,
  handleKeyPress,
}) => (
  <div className="flex flex-col h-full">
    <div className="p-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">Chat</div>
        <div className="flex items-center">
          <button
            className={`px-2 py-1 text-xs rounded-l-md cursor-pointer !rounded-button whitespace-nowrap ${
              !isPrivateChat ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setIsPrivateChat(false)}
          >
            Public
          </button>
          <button
            className={`px-2 py-1 text-xs rounded-r-md cursor-pointer !rounded-button whitespace-nowrap ${
              isPrivateChat ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setIsPrivateChat(true)}
          >
            Private
          </button>
        </div>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {chatMessages
        .filter((msg) => !isPrivateChat || msg.isPrivate)
        .map((message) => (
          <div key={message.id} className="flex flex-col">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium mr-2">
                {message.user.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium text-sm text-gray-800">{message.user}</span>
                  <span className="ml-2 text-xs text-gray-500">{message.timestamp}</span>
                  {message.isPrivate && (
                    <span className="ml-2 text-xs text-indigo-600 bg-indigo-50 px-1 rounded">
                      private
                    </span>
                  )}
                </div>
                <div className="mt-1 text-sm text-gray-600">{message.message}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
    <div className="p-3 border-t border-gray-200">
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={`Type ${isPrivateChat ? 'private' : 'public'} message...`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-indigo-600 text-white rounded-r-lg px-4 py-2 text-sm cursor-pointer !rounded-button whitespace-nowrap"
          onClick={handleSendMessage}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
);

ChatTab.propTypes = {
  chatMessages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.string,
      message: PropTypes.string,
      isPrivate: PropTypes.bool,
      timestamp: PropTypes.string,
    })
  ).isRequired,
  newMessage: PropTypes.string.isRequired,
  setNewMessage: PropTypes.func.isRequired,
  isPrivateChat: PropTypes.bool.isRequired,
  setIsPrivateChat: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};

export default ChatTab;