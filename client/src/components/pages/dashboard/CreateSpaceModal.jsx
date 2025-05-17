// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateSpaceModal = ({ isOpen, setIsOpen, currUser }) => {
//   const [name, setName] = useState('');
//   const [maxNoOfPeople, setMaxNoOfPeople] = useState('');
//   const [pass, setPass] = useState('');
//   const [formStatus, setFormStatus] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const baseURL = import.meta.env.VITE_BACKEND_URL;;  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormStatus(null);
//     setErrorMessage('');

//     if (!name || !maxNoOfPeople) {
//       setFormStatus('error');
//       setErrorMessage('Name and maximum number of people are required');
//       return;
//     }

//     try {
//       const createData = {
//         name,
//         maxNoOfPeople: Number(maxNoOfPeople),
//         pass,
//         userId: currUser.userId,
//       };

//       const response = await axios.post(`${baseURL}/spaces/create`, createData, { withCredentials: true });

//       if (response.status === 201) {
//         setFormStatus('success');
//         setName('');
//         setMaxNoOfPeople('');
//         setPass('');
//         setTimeout(() => setIsOpen(false), 1500);
//       }
//     } catch (error) {
//       setFormStatus('error');
//       setErrorMessage(error.response?.data?.message || 'Failed to create space');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-2 sm:p-4">
//       <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
//         <div className="flex justify-between items-center mb-4 sm:mb-6">
//           <h2 className="text-xl sm:text-2xl font-bold text-white">Create New Space</h2>
//           <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-lg sm:text-xl">
//             <i className="fas fa-times"></i>
//           </button>
//         </div>

//         {formStatus === 'success' && (
//           <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 sm:mb-6">
//             Space created successfully!
//           </div>
//         )}
//         {formStatus === 'error' && (
//           <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 sm:mb-6">
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {[
//             { label: 'Space Name', type: 'text', value: name, onChange: setName, id: 'spaceName' },
//             { label: 'Max Number of People', type: 'number', value: maxNoOfPeople, onChange: setMaxNoOfPeople, id: 'maxPeople' },
//             { label: 'Password (optional)', type: 'password', value: pass, onChange: setPass, id: 'spacePass' }
//           ].map(({ label, type, value, onChange, id }, index) => (
//             <div className="relative mb-6" key={index}>
//               <input
//                 type={type}
//                 id={id}
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
//             className="w-full rounded cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
//           >
//             Create Space
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateSpaceModal;


// import React, { useState } from 'react';
// import axios from 'axios';
// import DOMPurify from 'dompurify';

// const CreateSpaceModal = ({ isOpen, setIsOpen, currUser }) => {
//   const [name, setName] = useState('');
//   const [maxNoOfPeople, setMaxNoOfPeople] = useState('');
//   const [pass, setPass] = useState('');
//   const [formStatus, setFormStatus] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const baseURL = import.meta.env.VITE_BACKEND_URL;

//   const validateInputs = () => {
//     if (!name.trim()) return 'Space name is required';
//     if (!maxNoOfPeople || isNaN(maxNoOfPeople) || Number(maxNoOfPeople) <= 0) {
//       return 'Maximum number of people must be a positive integer';
//     }
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
//       const sanitizedName = DOMPurify.sanitize(name);
//       const createData = {
//         name: sanitizedName,
//         maxNoOfPeople: Number(maxNoOfPeople),
//         pass: DOMPurify.sanitize(pass),
//         userId: currUser.userId,
//       };

//       const response = await axios.post(`${baseURL}/spaces/create`, createData, {
//         withCredentials: true,
//       });

//       if (response.status === 201) {
//         setFormStatus('success');
//         setName('');
//         setMaxNoOfPeople('');
//         setPass('');
//         setTimeout(() => setIsOpen(false), 1500);
//       }
//     } catch (error) {
//       setFormStatus('error');
//       setErrorMessage(
//         error.response?.data?.message ||
//           'Failed to create space. Please try again.'
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
//       aria-labelledby="create-space-title"
//       aria-modal="true"
//     >
//       <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
//         <div className="flex justify-between items-center mb-4 sm:mb-6">
//           <h2 id="create-space-title" className="text-xl sm:text-2xl font-bold text-white">
//             Create New Space
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
//             Space created successfully!
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
//           {[
//             {
//               label: 'Space Name',
//               type: 'text',
//               value: name,
//               onChange: setName,
//               id: 'spaceName',
//               placeholder: 'Enter space name',
//             },
//             {
//               label: 'Max Number of People',
//               type: 'number',
//               value: maxNoOfPeople,
//               onChange: setMaxNoOfPeople,
//               id: 'maxPeople',
//               placeholder: 'Enter max participants',
//             },
//             {
//               label: 'Password (optional)',
//               type: 'password',
//               value: pass,
//               onChange: setPass,
//               id: 'spacePass',
//               placeholder: 'Enter space password',
//             },
//           ].map(({ label, type, value, onChange, id, placeholder }, index) => (
//             <div className="relative mb-6" key={id}>
//               <input
//                 type={type}
//                 id={id}
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
//                 placeholder={placeholder}
//                 required={index < 2}
//                 aria-required={index < 2}
//                 aria-label={label}
//                 min={type === 'number' ? 1 : undefined}
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
//             className="w-full rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
//             disabled={isSubmitting}
//             aria-busy={isSubmitting}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
//                 Creating...
//               </span>
//             ) : (
//               'Create Space'
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateSpaceModal;

import React, { useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const CreateSpaceModal = ({ isOpen, setIsOpen, currUser, onSpaceCreated }) => {
  const [name, setName] = useState('');
  const [maxNoOfPeople, setMaxNoOfPeople] = useState('');
  const [pass, setPass] = useState('');
  const [formStatus, setFormStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const validateInputs = () => {
    if (!name.trim()) return 'Space name is required';
    if (!maxNoOfPeople || isNaN(maxNoOfPeople) || Number(maxNoOfPeople) <= 0) {
      return 'Maximum number of people must be a positive integer';
    }
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
      const sanitizedName = DOMPurify.sanitize(name);
      const createData = {
        name: sanitizedName,
        maxNoOfPeople: Number(maxNoOfPeople),
        pass: DOMPurify.sanitize(pass),
        userId: currUser.userId,
      };

      const response = await axios.post(`${baseURL}/spaces/create`, createData, {
       headers: {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
       }
      });

      if (response.status === 201) {
        setFormStatus('success');
        setName('');
        setMaxNoOfPeople('');
        setPass('');
        onSpaceCreated(); // Notify parent to refresh spaces
        setTimeout(() => setIsOpen(false), 1500);
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(
        error.response?.data?.message ||
          'Failed to create space. Please try again.'
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
      aria-labelledby="create-space-title"
      aria-modal="true"
    >
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 w-full sm:max-w-md">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 id="create-space-title" className="text-xl sm:text-2xl font-bold text-white">
            Create New Space
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
            Space created successfully!
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
          {[
            {
              label: 'Space Name',
              type: 'text',
              value: name,
              onChange: setName,
              id: 'spaceName',
              placeholder: 'Enter space name',
            },
            {
              label: 'Max Number of People',
              type: 'number',
              value: maxNoOfPeople,
              onChange: setMaxNoOfPeople,
              id: 'maxPeople',
              placeholder: 'Enter max participants',
            },
            {
              label: 'Password (optional)',
              type: 'password',
              value: pass,
              onChange: setPass,
              id: 'spacePass',
              placeholder: 'Enter space password',
            },
          ].map(({ label, type, value, onChange, id}, index) => (
            <div className="relative mb-6" key={id}>
              <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="peer w-full px-4 py-3 text-white border-b-2 border-gray-600 focus:border-blue-500 outline-none bg-transparent"
                placeholder={""}
                required={index < 2}
                aria-required={index < 2}
                aria-label={label}
                min={type === 'number' ? 1 : undefined}
              />
              <label
                htmlFor={id}
                className="absolute left-4 top-3 text-gray-400 transition-all duration-300 transform -translate-y-6 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500"
              >
                {label}
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="w-full rounded cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Creating...
              </span>
            ) : (
              'Create Space'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSpaceModal;