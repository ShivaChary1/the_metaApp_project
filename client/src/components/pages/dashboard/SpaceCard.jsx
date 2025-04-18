import React from 'react';

const SpaceCard = ({ title, createdOrJoined, participants, lastActive, iconClass, iconColor, avatars }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className={`w-10 h-10 ${iconColor}/20 rounded-full flex items-center justify-center mr-3`}>
            <i className={`fas ${iconClass} ${iconColor}`}></i>
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-400">{createdOrJoined}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
      <div className="mb-4">
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <i className="fas fa-users mr-2"></i>
          <span>{participants} participants</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <i className="fas fa-clock mr-2"></i>
          <span>Last active: {lastActive}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {avatars.map((avatar, index) => (
            <div key={index} className={`w-8 h-8 rounded-full ${avatar.bgColor}/20 flex items-center justify-center`}>
              <span className={`text-xs ${avatar.textColor}`}>{avatar.initials}</span>
            </div>
          ))}
        </div>
        <button className="!rounded-button whitespace-nowrap bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 transition-all duration-300">
          Enter Space
        </button>
      </div>
    </div>
  );
};

export default SpaceCard;