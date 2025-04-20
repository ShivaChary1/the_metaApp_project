// import React, { useState } from 'react';
// import axios from 'axios';

// const ProfileModal = ({ isOpen, setIsOpen, currUser }) => {
//   if(currUser === null) {
//     currUser = {
//       name: 'x',
//       email: 'x',
//     }
//   }; // Check if currUser is undefined
//   const [fullName, setFullName] = useState(currUser.name || 'x');
//   const [email, setEmail] = useState(currUser.email || 'x');
//   const [password, setPassword] = useState();
//   const [confirmPassword, setConfirmPassword] = useState();
//   const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null
//   const [errorMessage, setErrorMessage] = useState('x');

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
//       const updateData = { fullName, email };
//       if (password) updateData.password = password;
//       if (currUser._id) updateData.userId = currUser._id; // Include userId if available

//       const response = await axios.put('http://localhost:5000/users/update', updateData);

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
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center sm:mt-12 z-50 p-2 sm:p-4">
//       <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
//         <div className="flex justify-between items-center mb-4 sm:mb-6">
//           <h2 className="text-xl sm:text-2xl font-bold text-white">Your Profile</h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-gray-400 hover:text-white text-lg sm:text-xl"
//           >
//             <i className="fas fa-times"></i>
//           </button>
//         </div>

//         {formStatus === 'success' && (
//           <div className="bg-green-100 border border-green-200 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
//             Profile updated successfully!
//           </div>
//         )}
//         {formStatus === 'error' && (
//           <div className="bg-red-100 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4 sm:mb-6">
//             <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Full Name</label>
//             <input
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
//               placeholder="Enter your full name"
//               required
//             />
//           </div>
//           <div className="mb-4 sm:mb-6">
//             <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="mb-4 sm:mb-6">
//             <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">New Password (optional)</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
//               placeholder="Enter new password"
//             />
//           </div>
//           <div className="mb-4 sm:mb-6">
//             <label className="block text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Confirm Password</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full bg-gray-700 border-none text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
//               placeholder="Confirm new password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="!rounded-button whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer w-full text-sm sm:text-base"
//           >
//             Update Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfileModal;


// import React, { useState } from 'react';
// import axios from 'axios';

// const ProfileModal = ({ isOpen, setIsOpen, currUser }) => {
//   if (currUser === null) {
//     currUser = { name: 'x', email: 'x' };
//   }

//   const [fullName, setFullName] = useState(currUser.name || '');
//   const [email, setEmail] = useState(currUser.email || '');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [formStatus, setFormStatus] = useState(null);
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
//       const updateData = { fullName, email };
//       if (password) updateData.password = password;
//       if (currUser._id) updateData.userId = currUser._id;

//       const response = await axios.put('http://localhost:5000/users/update', updateData);
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
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center sm:mt-12 z-50 p-2 sm:p-4">
//       <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-white">Your Profile</h2>
//           <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-xl">
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
//           {[
//             { label: 'Full Name', type: 'text', value: fullName, onChange: setFullName, id: 'fullName' },
//             { label: 'Email', type: 'email', value: email, onChange: setEmail, id: 'email' },
//             { label: 'New Password (optional)', type: 'password', value: password, onChange: setPassword, id: 'password' },
//             { label: 'Confirm Password', type: 'password', value: confirmPassword, onChange: setConfirmPassword, id: 'confirmPassword' },
//           ].map(({ label, type, value, onChange, id }, index) => (
//             <div className="relative mb-6" key={index}>
//               <input
//                 type={type}
//                 id={id}
//                 contentEditable={label === "Email" ? false : true}
//                 className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
//                 placeholder=" "
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 required={index < 2}
//               />
//               <label
//                 htmlFor={id}
//                 className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
//               >
//                 {label}
//               </label>
//             </div>
//           ))}

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r rounded cursor-pointer from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
//           >
//             Update Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfileModal;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProfileModal = ({ isOpen, setIsOpen, currUser = { name: '', email: '' } }) => {
//   const [fullName, setFullName] = useState(currUser.name || '');
//   const [email, setEmail] = useState(currUser.email || '');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [formStatus, setFormStatus] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     if (currUser) {
//       setFullName(currUser.name || '');
//       setEmail(currUser.email || '');
//     }
//   }, [currUser]);
  

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
//       const updateData = { fullName,userId :currUser._id};
//       if (password) updateData.password = password;


//       const response = await axios.put('http://192.168.1.109:5000/users/update', updateData,{withCredentials:true});

//       localStorage.setItem('user', JSON.stringify({ ...currUser, name: fullName }));  

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
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center sm:mt-12 z-50 p-2 sm:p-4">
//       <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-white">Your Profile</h2>
//           <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-xl">
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
//           <div className="relative mb-6">
//             <input
//               type="text"
//               id="fullName"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
//               placeholder=" "
//               required
//             />
//             <label
//               htmlFor="fullName"
//               className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform 
//               -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
//               peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
//             >
//               Full Name
//             </label>
//           </div>

//           <div className="relative mb-6">
//             <input
//               type="email"
//               id="email"
//               value={email}
//               readOnly
//               className='peer w-full px-4 py-3 text-gray-400 border-b-2 border-gray-600 bg-transparent cursor-not-allowed outline-none'
//               placeholder=" "
//             />
//             <label
//               htmlFor="email"
//               className="absolute left-4 top-3 text-gray-500 transition-all duration-300 transform 
//               -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
//               peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
//             >
//               Email
//             </label>
//           </div>

//           <div className="relative mb-6">
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
//               placeholder=" "
//             />
//             <label
//               htmlFor="password"
//               className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform 
//               -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
//               peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
//             >
//               New Password (optional)
//             </label>
//           </div>

//           <div className="relative mb-6">
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
//               placeholder=" "
//             />
//             <label
//               htmlFor="confirmPassword"
//               className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform 
//               -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
//               peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
//             >
//               Confirm Password
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r rounded cursor-pointer from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg 
//             hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
//           >
//             Update Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfileModal;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileModal = ({ isOpen, setIsOpen, currUser = { name: '', email: '' } }) => {
  const [fullName, setFullName] = useState(currUser.name || '');
  const [email, setEmail] = useState(currUser.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formStatus, setFormStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (currUser) {
      setFullName(currUser.name || '');
      setEmail(currUser.email || '');
    }
  }, [currUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);
    setErrorMessage('');

    if (password && password !== confirmPassword) {
      setFormStatus('error');
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!currUser.userId) {
      console.log(currUser)
      setFormStatus('error');
      setErrorMessage('User ID not found. Please log in again.');
      return;
    }

    try {
      const updateData = { fullName, userId: currUser.userId };
      if (password) updateData.password = password;

      const response = await axios.put('http://192.168.1.109:5000/users/update', updateData, {
        withCredentials: true,
      });

      // Update localStorage with new fullName
      localStorage.setItem('currUser', JSON.stringify({ ...currUser, name: fullName }));

      if (response.status === 200) {
        setFormStatus('success');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => setIsOpen(false), 1500); // Close modal after success
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Your Profile</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-xl">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {formStatus === 'success' && (
          <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            Profile updated successfully!
          </div>
        )}
        {formStatus === 'error' && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
              placeholder=" "
              required
            />
            <label
              htmlFor="fullName"
              className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform 
              -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
              peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
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
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-500 transition-all duration-300 transform 
              -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
              peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
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
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform 
              -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
              peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
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
              placeholder=" "
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform 
              -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
              peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Confirm Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg 
            hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;