// import React, { useState } from 'react';
// import axios from 'axios';

// const JoinSpaceModal = ({ isOpen, setIsOpen }) => {
//   const [id, setId] = useState('');
//   const [pass, setPass] = useState('');
//   const [formStatus, setFormStatus] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const baseURL = import.meta.env.VITE_BACKEND_URL;;  
//   const currUser = JSON.parse(localStorage.getItem('currUser'));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormStatus(null);
//     setErrorMessage('');

//     if (!id) {
//       setFormStatus('error');
//       setErrorMessage('Space ID and password are required');
//       return;
//     }

//     try {
//       const joinData = { id, pass,userId:currUser.userId };
//       const response = await axios.post(`${baseURL}/spaces/join`, joinData, {
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         setFormStatus('success');
//         setId('');
//         setPass('');
//         setTimeout(() => setIsOpen(false), 1500);
//       }
//     } catch (error) {
//       setFormStatus('error');
//       console.error('Error joining space:', error);
//       setErrorMessage(error.response?.data?.message || 'Failed to join space');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-2 sm:p-4">
//       <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
//         <div className="flex justify-between items-center mb-4 sm:mb-6">
//           <h2 className="text-xl sm:text-2xl font-bold text-white">Join Space</h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-gray-400 hover:text-white text-lg sm:text-xl"
//           >
//             <i className="fas fa-times"></i>
//           </button>
//         </div>

//         {formStatus === 'success' && (
//           <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
//             Joined space successfully!
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
//               id="spaceId"
//               value={id}
//               onChange={(e) => setId(e.target.value)}
//               className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
//               placeholder=" "
//               required
//             />
//             <label
//               htmlFor="spaceId"
//               className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform 
//               -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
//               peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
//             >
//               Space ID
//             </label>
//             <div className="absolute right-4 top-3 text-gray-400">
//               <i className="fas fa-hashtag"></i>
//             </div>
//           </div>

//           <div className="relative mb-6">
//             <input
//               type="password"
//               id="spacePassword"
//               value={pass}
//               onChange={(e) => setPass(e.target.value)}
//               className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
//               placeholder=" "
//             />
//             <label
//               htmlFor="spacePassword"
//               className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform 
//               -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
//               peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
//             >
//               Password
//             </label>
//             <div className="absolute right-4 top-3 text-gray-400">
//               <i className="fas fa-lock"></i>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r rounded cursor-pointer from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg 
//             hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
//           >
//             Join Space
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default JoinSpaceModal;


// import React, { useState } from 'react';
// import axios from 'axios';
// import DOMPurify from 'dompurify';

// const JoinSpaceModal = ({ isOpen, setIsOpen, onSpaceJoined }) => {
//   const [id, setId] = useState('');
//   const [pass, setPass] = useState('');
//   const [formStatus, setFormStatus] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const baseURL = import.meta.env.VITE_BACKEND_URL;
//   const currUser = JSON.parse(localStorage.getItem('currUser'));

//   const validateInputs = () => {
//     if (!id.trim()) return 'Space ID is required';
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormStatus(null);
//     setErrorMessage('');

//     const validationError = validateInputs();
//     if (validationError) {
//       setFormStatus('error');
//       setErrorMessage(validationError);
//       return;
//     }

//     if (!currUser?.userId) {
//       setFormStatus('error');
//       setErrorMessage('User not authenticated. Please log in.');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const joinData = {
//         id: DOMPurify.sanitize(id),
//         pass: DOMPurify.sanitize(pass),
//         userId: currUser.userId,
//       };
//       const response = await axios.post(`${baseURL}/spaces/join`, joinData, {
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         setFormStatus('success');
//         setId('');
//         setPass('');
//         onSpaceJoined(); // Notify parent to refresh spaces
//         setTimeout(() => setIsOpen(false), 1500);
//       }
//     } catch (error) {
//       setFormStatus('error');
//       setErrorMessage(
//         error.response?.data?.message ||
//           'Failed to join space. Please check the ID or password.'
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-2 sm:p-4"
//       role="dialog"
//       aria-labelledby="join-space-title"
//       aria-modal="true"
//     >
//       <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
//         <div className="flex justify-between items-center mb-4 sm:mb-6">
//           <h2 id="join-space-title" className="text-xl sm:text-2xl font-bold text-white">
//             Join Space
//           </h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-gray-400 hover:text-white text-lg sm:text-xl"
//             aria-label="Close modal"
//           >
//             <i className="fas fa-times" aria-hidden="true"></i>
//           </button>
//         </div>

//         {formStatus === 'success' && (
//           <div
//             className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6"
//             role="alert"
//           >
//             Joined space successfully!
//           </div>
//         )}
//         {formStatus === 'error' && (
//           <div
//             className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
//             role="alert"
//           >
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} noValidate>
//           <div className="relative mb-6">
//             <input
//               type="text"
//               id="spaceId"
//               value={id}
//               onChange={(e) => setId(e.target.value)}
//               className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
//               placeholder="Enter space ID"
//               required
//               aria-required="true"
//               aria-label="Space ID"
//             />
//             <label
//               htmlFor="spaceId"
//               className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
//             >
//               Space ID
//             </label>
//             <div className="absolute right-4 top-3 text-gray-400">
//               <i className="fas fa-hashtag" aria-hidden="true"></i>
//             </div>
//           </div>

//           <div className="relative mb-6">
//             <input
//               type="password"
//               id="spacePassword"
//               value={pass}
//               onChange={(e) => setPass(e.target.value)}
//               className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
//               placeholder="Enter space password"
//               aria-label="Password (optional)"
//             />
//             <label
//               htmlFor="spacePassword"
//               className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
//             >
//               Password (optional)
//             </label>
//             <div className="absolute right-4 top-3 text-gray-400">
//               <i className="fas fa-lock" aria-hidden="true"></i>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
//             disabled={isSubmitting}
//             aria-busy={isSubmitting}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
//                 Joining...
//               </span>
//             ) : (
//               'Join Space'
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default JoinSpaceModal;

import React, { useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const JoinSpaceModal = ({ isOpen, setIsOpen, onSpaceJoined }) => {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [formStatus, setFormStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const currUser = JSON.parse(localStorage.getItem('currUser'));

  const validateInputs = () => {
    if (!id.trim()) return 'Space ID is required';
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

    if (!currUser?.userId) {
      setFormStatus('error');
      setErrorMessage('User not authenticated. Please log in.');
      return;
    }

    setIsSubmitting(true);
    try {
      const joinData = {
        id: DOMPurify.sanitize(id),
        pass: DOMPurify.sanitize(pass),
        userId: currUser.userId,
      };
      const response = await axios.post(`${baseURL}/spaces/join`, joinData, {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setFormStatus('success');
        setId('');
        setPass('');
        onSpaceJoined(); // Notify parent to refresh spaces
        setTimeout(() => setIsOpen(false), 1500);
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(
        error.response?.data?.message ||
          'Failed to join space. Please check the ID or password.'
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
      aria-labelledby="join-space-title"
      aria-modal="true"
    >
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 id="join-space-title" className="text-xl sm:text-2xl font-bold text-white">
            Join Space
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white text-lg sm:text-xl"
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
            Joined space successfully!
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
              id="spaceId"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
              placeholder=""
              required
              aria-required="true"
              aria-label="Space ID"
            />
            <label
              htmlFor="spaceId"
              className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Space ID
            </label>
            <div className="absolute right-4 top-3 text-gray-400">
              <i className="fas fa-hashtag" aria-hidden="true"></i>
            </div>
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              id="spacePassword"
              value={pass}
              placeholder=''
              onChange={(e) => setPass(e.target.value)}
              className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
              aria-label="Password (optional)"
            />
            <label
              htmlFor="spacePassword"
              className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
            >
              Password (optional)
            </label>
            <div className="absolute right-4 top-3 text-gray-400">
              <i className="fas fa-lock" aria-hidden="true"></i>
            </div>
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
                Joining...
              </span>
            ) : (
              'Join Space'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinSpaceModal;