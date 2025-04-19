// import React, { useState } from 'react';
// import axios from 'axios';

// const ProfileModal = ({ isOpen, setIsOpen,currUser }) => {
//   const [fullName, setFullName] = useState(currUser.name); // Placeholder default
//   const [email, setEmail] = useState(currUser.email); // Placeholder default
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormStatus(null);
//     setErrorMessage('');

//     if (password && password !== confirmPassword) {
//       setFormStatus('error');
//       setErrorMessage('Passwords do not match');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token'); // Assumes JWT token from login
//       const updateData = { fullName, email };
//       if (password) updateData.password = password;

//       const response = await axios.put('http://localhost:5000/users/update', updateData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 200) {
//         setFormStatus('success');
//         setPassword('');
//         setConfirmPassword('');
//       }
//     } catch (error) {
//       setFormStatus('error');
//       setErrorMessage(error.response?.data?.message || 'Failed to update profile');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center mt-12 z-50 p-4">
//       <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700 max-w-md w-full">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-white">Your Profile</h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-gray-400 hover:text-white"
//           >
//             <i className="fas fa-times"></i>
//           </button>
//         </div>

//         {formStatus === 'success' && (
//           <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
//             Profile updated successfully!
//           </div>
//         )}
//         {formStatus === 'error' && (
//           <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label className="block text-gray-400 mb-2 text-sm">Full Name</label>
//             <input
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//               placeholder="Enter your full name"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-400 mb-2 text-sm">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-400 mb-2 text-sm">New Password (optional)</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//               placeholder="Enter new password"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-400 mb-2 text-sm">Confirm Password</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//               placeholder="Confirm new password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="!rounded-button whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer w-full"
//           >
//             Update Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfileModal;


import React, { useState } from 'react';
import axios from 'axios';

const ProfileModal = ({ isOpen, setIsOpen, currUser }) => {
  if(currUser === null) {
    currUser = {
      name: 'x',
      email: 'x',
    }
  }; // Check if currUser is undefined
  const [fullName, setFullName] = useState(currUser.name || 'x');
  const [email, setEmail] = useState(currUser.email || 'x');
  const [password, setPassword] = useState('x');
  const [confirmPassword, setConfirmPassword] = useState('x');
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('x');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);
    setErrorMessage('');

    if (password && password !== confirmPassword) {
      setFormStatus('error');
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const updateData = { fullName, email };
      if (password) updateData.password = password;
      if (currUser._id) updateData.userId = currUser._id; // Include userId if available

      const response = await axios.put('http://localhost:5000/users/update', updateData);

      if (response.status === 200) {
        setFormStatus('success');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center sm:mt-12 z-50 p-2 sm:p-4">
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Your Profile</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white text-lg sm:text-xl"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {formStatus === 'success' && (
          <div className="bg-green-100 border border-green-200 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            Profile updated successfully!
          </div>
        )}
        {formStatus === 'error' && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">New Password (optional)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="submit"
            className="!rounded-button whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer w-full text-sm sm:text-base"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;