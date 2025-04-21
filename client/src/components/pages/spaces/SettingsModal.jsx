import React from 'react';
import PropTypes from 'prop-types';

const SettingsModal = ({ toggleSettings }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Settings</h3>
        <button
          className="text-gray-400 hover:text-gray-500 cursor-pointer !rounded-button whitespace-nowrap"
          onClick={toggleSettings}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="p-4">
        <div className="flex border-b border-gray-200">
          <button className="px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 cursor-pointer !rounded-button whitespace-nowrap">
            Audio & Video
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Microphone</label>
            <select className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option>Default Microphone</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Camera</label>
            <select className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option>Default Camera</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 flex justify-end rounded-b-xl">
        <button
          className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium mr-2 cursor-pointer !rounded-button whitespace-nowrap"
          onClick={toggleSettings}
        >
          Cancel
        </button>
        <button
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
          onClick={toggleSettings}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

SettingsModal.propTypes = {
  toggleSettings: PropTypes.func.isRequired,
};

export default SettingsModal;