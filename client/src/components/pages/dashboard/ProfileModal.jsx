import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const ProfileModal = ({ isOpen, setIsOpen, currUser = { name: '', email: '' } }) => {
  const [fullName, setFullName] = useState(currUser.name || '');
  const [email, setEmail] = useState(currUser.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formStatus, setFormStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (currUser) {
      setFullName(currUser.name || '');
      setEmail(currUser.email || '');
    }
  }, [currUser]);

  const validateInputs = () => {
    if (!fullName.trim()) return 'Full name is required';
    if (password && password.length < 6) return 'Password must be at least 6 characters';
    if (password && password !== confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);
    setErrorMessage('');

    const validationError = validateInputs();
    if (validationError) {
      setFormStatus('error');
      setErrorMessage(validationError);
      return;
    }

    if (!currUser.userId) {
      setFormStatus('error');
      setErrorMessage('User ID not found. Please log in again.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updateData = { fullName: DOMPurify.sanitize(fullName), userId: currUser.userId };
      if (password) updateData.password = password;

      const response = await axios.put(`${baseURL}/users/update`, updateData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      localStorage.setItem('currUser', JSON.stringify({ ...currUser, name: fullName }));

      if (response.status === 200) {
        setFormStatus('success');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => setIsOpen(false), 1500);
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(
        error.response?.data?.message ||
          'Failed to update profile. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-2 sm:p-4"
      role="dialog"
      aria-labelledby="profile-title"
      aria-modal="true"
    >
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 id="profile-title" className="text-2xl font-bold text-white">
            Your Profile
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white text-xl"
            aria-label="Close modal"
          >
            <i className="fas cursor-pointer fa-times" aria-hidden="true"></i>
          </button>
        </div>

        {formStatus === 'success' && (
          <div
            className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6"
            role="alert"
          >
            Profile updated successfully!
          </div>
        )}
        {formStatus === 'error' && (
          <div
            className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="relative mb-6">
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
              placeholder=""
              required
              aria-required="true"
              aria-label="Full Name"
            />
            <label
              htmlFor="fullName"
              className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Full Name
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              className="peer w-full px-4 py-3 text-gray-400 border-b-2 border-gray-600 bg-transparent cursor-not-allowed outline-none"
              placeholder=""
              aria-label="Email (read-only)"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-500 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Email
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
              placeholder=""
              aria-label="New Password (optional)"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              New Password (optional)
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
              placeholder=""
              aria-label="Confirm Password"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Confirm Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Updating...
              </span>
            ) : (
              'Update Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;