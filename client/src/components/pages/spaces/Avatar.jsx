import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ position, isMoving, direction, name, isCurrentUser, isMicOn, isCameraOn }) => {
  const getAvatarClass = () => {
    const baseClass = 'absolute transition-all duration-300 ease-in-out';
    const directionClass = `avatar-${direction}`;
    const animationClass = isMoving ? 'avatar-moving' : '';
    return `${baseClass} ${directionClass} ${animationClass}`;
  };

  return (
    <div className={getAvatarClass()} style={{ left: `${position.x}%`, top: `${position.y}%` }}>
      <div className="relative">
        <div
          className={`w-12 h-12 ${
            isCurrentUser ? 'bg-indigo-500' : 'bg-blue-500'
          } rounded-full flex items-center justify-center text-white text-xl shadow-md`}
        >
          <span>{name.charAt(0)}</span>
        </div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <div className="bg-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
            {name}
            <span className="ml-1 text-green-500">
              <i className={`fas ${isMicOn ? 'fa-microphone' : 'fa-microphone-slash'} text-xs`}></i>
            </span>
            <span className="ml-1 text-green-500">
              <i className={`fas ${isCameraOn ? 'fa-video' : 'fa-video-slash'} text-xs`}></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Avatar.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  isMoving: PropTypes.bool.isRequired,
  direction: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  isMicOn: PropTypes.bool.isRequired,
  isCameraOn: PropTypes.bool.isRequired,
};

export default Avatar;