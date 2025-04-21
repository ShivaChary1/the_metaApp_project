import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ isMicOn, isCameraOn, toggleMic, toggleCamera, toggleSettings }) => (
  <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10">
    <div className="flex items-center">
      <div className="text-2xl font-bold text-indigo-600 mr-2">
        <i className="fas fa-cubes"></i>
      </div>
      <span className="font-bold text-xl">VirtualSpace</span>
    </div>
    <div className="text-lg font-semibold text-gray-700">Love Room</div>
    <div className="flex items-center space-x-4">
      <button
        className={`p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap ${
          isMicOn ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-600'
        }`}
        onClick={toggleMic}
      >
        <i className={`fas ${isMicOn ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
      </button>
      <button
        className={`p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap ${
          isCameraOn ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-600'
        }`}
        onClick={toggleCamera}
      >
        <i className={`fas ${isCameraOn ? 'fa-video' : 'fa-video-slash'}`}></i>
      </button>
      <button className="p-2 rounded-full bg-indigo-100 text-indigo-600 cursor-pointer !rounded-button whitespace-nowrap">
        <i className="fas fa-user-plus"></i>
      </button>
      <button
        className="p-2 rounded-full bg-gray-100 text-gray-600 cursor-pointer !rounded-button whitespace-nowrap"
        onClick={toggleSettings}
      >
        <i className="fas fa-cog"></i>
      </button>
    </div>
  </div>
);

Navbar.propTypes = {
  isMicOn: PropTypes.bool.isRequired,
  isCameraOn: PropTypes.bool.isRequired,
  toggleMic: PropTypes.func.isRequired,
  toggleCamera: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired,
};

export default Navbar;