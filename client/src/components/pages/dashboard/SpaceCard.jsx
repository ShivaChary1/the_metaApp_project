// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getSocket } from '../../utils/socket';

// const SpaceCard = ({ title, id, createdOrJoined, participants, lastActive, iconClass, iconColor, avatars }) => {
//   const [showNotification, setShowNotification] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const socket = getSocket();
//   const menuRef = useRef(null);

//   const copyToClipboardFallback = (text) => {
//     const textarea = document.createElement('textarea');
//     textarea.value = text;
//     textarea.style.position = 'fixed';
//     textarea.style.opacity = '0';
//     document.body.appendChild(textarea);
//     textarea.focus();
//     textarea.select();
//     try {
//       document.execCommand('copy');
//       return true;
//     } catch (err) {
//       console.error('Fallback copy failed:', err);
//       return false;
//     } finally {
//       document.body.removeChild(textarea);
//     }
//   };

//   const handleCopyId = () => {
//     const text = id;
//     if (navigator.clipboard && navigator.clipboard.writeText) {
//       navigator.clipboard.writeText(text).then(
//         () => showCopied(true),
//         () => {
//           const success = copyToClipboardFallback(text);
//           showCopied(success);
//         }
//       );
//     } else {
//       const success = copyToClipboardFallback(text);
//       showCopied(success);
//     }
//   };

//   const showCopied = (success) => {
//     setShowNotification(true);
//     setTimeout(() => setShowNotification(false), 2000);
//     setMenuOpen(false);
//     if (!success) console.warn("Clipboard fallback failed.");
//   };

//   const handleEnterSpace = () => {
//     if (id) {
//       localStorage.setItem('spaceId', id);
//       socket.emit('enteredSpace', { spaceId: id });
//       console.log('Entered space:', id);
//       navigate(`/dashboard/open/${encodeURIComponent(id)}`);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('touchstart', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('touchstart', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div
//       className="relative bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
//       role="region"
//       aria-label={`Space: ${title}`}
//     >
//       {showNotification && (
//         <div
//           className="absolute top-2 right-2 bg-green-600 text-white text-sm px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out"
//           role="alert"
//         >
//           Space ID copied!
//         </div>
//       )}

//       <div className="flex justify-between items-start mb-4 relative z-30">
//         <div className="flex items-center">
//           <div className={`w-10 h-10 ${iconColor}/20 rounded-full flex items-center justify-center mr-3`}>
//             <i className={`fas ${iconClass} ${iconColor}`} aria-hidden="true"></i>
//           </div>
//           <div>
//             <h3 className="font-semibold">{title}</h3>
//             <p className="text-sm text-gray-400">{createdOrJoined}</p>
//           </div>
//         </div>

//         <div className="relative z-40">
//           <button
//             className="text-gray-400 cursor-pointer hover:text-white"
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setMenuOpen(!menuOpen);
//             }}
//             aria-label={menuOpen ? 'Close menu' : 'Open menu'}
//             aria-expanded={menuOpen}
//           >
//             <i className={`fas ${menuOpen ? 'fa-times' : 'fa-ellipsis-v'}`} aria-hidden="true"></i>
//           </button>

//           {menuOpen && (
//             <div
//               ref={menuRef}
//               className="absolute right-0 mt-2 w-36 bg-gray-700 rounded shadow-lg z-50"
//               onClick={(e) => e.stopPropagation()}
//               onTouchStart={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   handleCopyId();
//                 }}
//                 className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
//                 aria-label="Copy Space ID"
//               >
//                 Copy Space ID
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mb-4">
//         <div className="flex items-center text-sm text-gray-400 mb-2">
//           <i className="fas fa-users mr-2" aria-hidden="true"></i>
//           <span>{participants} participants</span>
//         </div>
//         <div className="flex items-center text-sm text-gray-400">
//           <i className="fas fa-clock mr-2" aria-hidden="true"></i>
//           <span>Last active: {lastActive}</span>
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <div className="flex -space-x-2">
//           {avatars.map((avatar, index) => (
//             <div
//               key={index}
//               className={`w-8 h-8 rounded-full ${avatar.bgColor}/20 flex items-center justify-center`}
//               aria-label={`Participant ${avatar.initials}`}
//             >
//               <span className={`text-xs ${avatar.textColor}`}>{avatar.initials}</span>
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={handleEnterSpace}
//           className="rounded cursor-pointer whitespace-nowrap bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 transition-all duration-300"
//           aria-label={`Enter ${title} space`}
//         >
//           Enter Space
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SpaceCard;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getSocket } from '../../utils/socket';

const SpaceCard = ({ title, id, createdOrJoined, participants, lastActive, iconClass, iconColor, avatars }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const socket = getSocket();
  const menuRef = useRef(null);
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const user = JSON.parse(localStorage.getItem('currUser'));

  const copyToClipboardFallback = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch (err) {
      console.error('Fallback copy failed:', err);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const handleCopyId = () => {
    const text = id;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showCopied(true),
        () => {
          const success = copyToClipboardFallback(text);
          showCopied(success);
        }
      );
    } else {
      const success = copyToClipboardFallback(text);
      showCopied(success);
    }
  };

  const showCopied = (success) => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    setMenuOpen(false);
    if (!success) console.warn("Clipboard fallback failed.");
  };

  const handleEnterSpace = () => {
    if (id) {
      localStorage.setItem('spaceId', id);
      socket.emit('enteredSpace', { spaceId: id });
      console.log('Entered space:', id);
      navigate(`/dashboard/open/${encodeURIComponent(id)}`);
    }
  };

  const handleLeaveSpace = async () => {
    if (!id || !user?.userId) {
      console.error('Space ID or User ID is missing');
      return;
    }

    try {
      await axios.post(
        `${baseURL}/spaces/leavespace`,
        { spaceId: id, userId: user.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {
      console.error('Error leaving space:', error.response?.data || error.message);
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
      role="region"
      aria-label={`Space: ${title}`}
    >
      {showNotification && (
        <div
          className="absolute top-2 right-2 bg-green-600 text-white text-sm px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out"
          role="alert"
        >
          Space ID copied!
        </div>
      )}

      <div className="flex justify-between items-start mb-4 relative z-30">
        <div className="flex items-center">
          <div className={`w-10 h-10 ${iconColor}/20 rounded-full flex items-center justify-center mr-3`}>
            <i className={`fas ${iconClass} ${iconColor}`} aria-hidden="true"></i>
          </div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{createdOrJoined}</p>
          </div>
        </div>

        <div className="relative z-40">
          <button
            className="text-gray-400 cursor-pointer hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-ellipsis-v'}`} aria-hidden="true"></i>
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-36 bg-gray-700 rounded shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCopyId();
                }}
                className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                aria-label="Copy Space ID"
              >
                Copy Space ID
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLeaveSpace();
                }}
                className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                aria-label="Leave Space"
              >
                Leave Space
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <i className="fas fa-users mr-2" aria-hidden="true"></i>
          <span>{participants} participants</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <i className="fas fa-clock mr-2" aria-hidden="true"></i>
          <span>Last active: {lastActive}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full ${avatar.bgColor}/20 flex items-center justify-center`}
              aria-label={`Participant ${avatar.initials}`}
            >
              <span className={`text-xs ${avatar.textColor}`}>{avatar.initials}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleEnterSpace}
          className="rounded cursor-pointer whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm py-2 px-4 transition-all duration-300 shadow-md transform hover:scale-105"
          aria-label={`Enter ${title} space`}
        >
          Enter Space
        </button>
      </div>
    </div>
  );
};

export default SpaceCard;