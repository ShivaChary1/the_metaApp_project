import React, { useState } from 'react';
import axios from 'axios';

const JoinSpaceModal = ({ isOpen, setIsOpen}) => {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);
    setErrorMessage('');

    if (!id) {
      setFormStatus('error');
      setErrorMessage('Space ID and password are required');
      return;
    }

    try {
      const joinData = { id, pass };

      const response = await axios.post('http://localhost:5000/spaces/join', joinData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setFormStatus('success');
        setId('');
        setPass('');
        setTimeout(() => setIsOpen(false), 1500); // Close modal after success
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Error joining space:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to join space');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center sm:mt-12 z-50 p-2 sm:p-4">
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Join Space</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white text-lg sm:text-xl"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {formStatus === 'success' && (
          <div className="bg-green-100 border border-green-200 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            Joined space successfully!
          </div>
        )}
        {formStatus === 'error' && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Space ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              placeholder="Enter space ID"
              required
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              placeholder="Enter space password"
            />
          </div>
          <button
            type="submit"
            className="!rounded-button whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer w-full text-sm sm:text-base"
          >
            Join Space
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinSpaceModal;