import React from 'react';
import PropTypes from 'prop-types';
import ChatTab from './ChatTab';
import UsersTab from './UsersTab';
import RoomsTab from './RoomsTab';

const Sidebar = ({
  showSidebar,
  toggleSidebar,
  activeTab,
  setActiveTab,
  chatMessages,
  newMessage,
  setNewMessage,
  isPrivateChat,
  setIsPrivateChat,
  handleSendMessage,
  handleKeyPress,
  users,
  space,
}) => (
  <div
    className={`bg-white border-l border-gray-200 transition-all duration-300 ease-in-out ${
      showSidebar ? 'w-80' : 'w-0 opacity-0 overflow-hidden'
    }`}
  >
    <div className="h-full flex flex-col">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${
            activeTab === 'chat' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </button>
        <button
          className={`flex-1 py-3 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${
            activeTab === 'users' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`flex-1 py-3 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${
            activeTab === 'rooms' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('rooms')}
        >
          Rooms
        </button>
        <button
          className="p-3 text-gray-500 cursor-pointer !rounded-button whitespace-nowrap"
          onClick={toggleSidebar}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      {activeTab === 'chat' && (
        <ChatTab
          chatMessages={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          isPrivateChat={isPrivateChat}
          setIsPrivateChat={setIsPrivateChat}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />
      )}
      {activeTab === 'users' && <UsersTab users={users} />}
      {activeTab === 'rooms' && <RoomsTab space={space} users={users} />}
    </div>
  </div>
);

Sidebar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
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
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.string,
      location: PropTypes.string,
      activity: PropTypes.string,
    })
  ).isRequired,
  space: PropTypes.shape({
    name: PropTypes.string,
    maxUsers: PropTypes.number,
    currentUsers: PropTypes.array,
  }).isRequired,
};

export default Sidebar;