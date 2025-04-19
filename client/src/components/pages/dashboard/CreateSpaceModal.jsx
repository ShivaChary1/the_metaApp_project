import React, { useState } from 'react';
import axios from 'axios';

const CreateSpaceModal = ({ isOpen, setIsOpen, currUser }) => {
  const [name, setName] = useState('');
  const [maxNoOfPeople, setMaxNoOfPeople] = useState('');
  const [pass, setPass] = useState('');
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);
    setErrorMessage('');

    if (!name || !maxNoOfPeople) {
      setFormStatus('error');
      setErrorMessage('Name and maximum number of people are required');
      return;
    }

    try {
      const createData = { name, maxNoOfPeople: Number(maxNoOfPeople), pass, userId: currUser._id };

      const response = await axios.post('http://localhost:5000/spaces/create', createData,{ withCredentials: true });

      if (response.status === 201) {
        setFormStatus('success');
        setName('');
        setMaxNoOfPeople('');
        setPass('');
        setTimeout(() => setIsOpen(false), 1500); // Close modal after success
      }
    } catch (error) {
      setFormStatus('error');
      console.log('Error creating space:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to create space');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center sm:mt-12 z-50 p-2 sm:p-4">
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Create New Space</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white text-lg sm:text-xl"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {formStatus === 'success' && (
          <div className="bg-green-100 border border-green-200 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            Space created successfully!
          </div>
        )}
        {formStatus === 'error' && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Space Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              placeholder="Enter space name"
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Max Number of People</label>
            <input
              type="number"
              value={maxNoOfPeople}
              onChange={(e) => setMaxNoOfPeople(e.target.value)}
              className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              placeholder="Enter max participants"
              min="1"
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Password (optional)</label>
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
            Create Space
          </button>
        </form>
      </div>
    </div>
  );


};

export default CreateSpaceModal;