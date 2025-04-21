import React from 'react';
import PropTypes from 'prop-types';

const UsersTab = ({ users }) => (
  <div className="flex flex-col h-full">
    <div className="p-3 border-b border-gray-200">
      <div className="text-sm font-medium text-gray-700">
        Users ({users.filter((u) => u.status !== 'offline').length} online)
      </div>
    </div>
    <div className="flex-1 overflow-y-auto">
      {users.map((user) => (
        <div key={user.id} className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
              {user.name.charAt(0)}
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                user.status === 'online' ? 'bg-green-500' : user.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
              }`}
            ></div>
          </div>
          <div className="ml-3 flex-1">
            <div className="text-sm font-medium text-gray-800">{user.name}</div>
            <div className="text-xs text-gray-500 flex items-center">
              <span className="truncate">{user.location}</span>
              <span className="mx-1">•</span>
              <span>{user.activity}</span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-indigo-600 cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-comment-alt"></i>
          </button>
        </div>
      ))}
    </div>
  </div>
);

UsersTab.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.string,
      location: PropTypes.string,
      activity: PropTypes.string,
    })
  ).isRequired,
};

export default UsersTab;