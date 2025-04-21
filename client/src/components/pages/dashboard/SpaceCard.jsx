// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SpaceCard = ({ title, id, createdOrJoined, participants, lastActive, iconClass, iconColor, avatars }) => {
//   const [showNotification, setShowNotification] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleCopyId = () => {
//     navigator.clipboard.writeText(id).then(() => {
//       setShowNotification(true);
//       setTimeout(() => setShowNotification(false), 2000);
//       setMenuOpen(false);
//     });
//   };

//   const handleEnterSpace = () => {
//     navigate(`/spaces/open?id=${id}`);
//   };

//   return (
//     <div className="relative bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
//       {showNotification && (
//         <div className="absolute top-2 right-2 bg-green-600 text-white text-sm px-4 py-2 rounded shadow-lg z-10 animate-fade-in-out">
//           Space ID copied!
//         </div>
//       )}

//       <div className="flex justify-between items-start mb-4 relative">
//         <div className="flex items-center">
//           <div className={`w-10 h-10 ${iconColor}/20 rounded-full flex items-center justify-center mr-3`}>
//             <i className={`fas ${iconClass} ${iconColor}`}></i>
//           </div>
//           <div>
//             <h3 className="font-semibold">{title}</h3>
//             <p className="text-sm text-gray-400">{createdOrJoined}</p>
//           </div>
//         </div>

//         <div className="relative">
//           <button
//             className="text-gray-400 hover:text-white"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <i className={`fas ${menuOpen ? 'fa-times' : 'fa-ellipsis-v'}`}></i>
//           </button>

//           {menuOpen && (
//             <div className="absolute right-0 mt-2 w-36 bg-gray-700 rounded shadow-lg z-20">
//               <button
//                 onClick={handleCopyId}
//                 className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
//               >
//                 Copy Space ID
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mb-4">
//         <div className="flex items-center text-sm text-gray-400 mb-2">
//           <i className="fas fa-users mr-2"></i>
//           <span>{participants} participants</span>
//         </div>
//         <div className="flex items-center text-sm text-gray-400">
//           <i className="fas fa-clock mr-2"></i>
//           <span>Last active: {lastActive}</span>
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <div className="flex -space-x-2">
//           {avatars.map((avatar, index) => (
//             <div key={index} className={`w-8 h-8 rounded-full ${avatar.bgColor}/20 flex items-center justify-center`}>
//               <span className={`text-xs ${avatar.textColor}`}>{avatar.initials}</span>
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={handleEnterSpace}
//           className="rounded whitespace-nowrap bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 transition-all duration-300"
//         >
//           Enter Space
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SpaceCard;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SpaceCard = ({ title, id, createdOrJoined, participants, lastActive, iconClass, iconColor, avatars }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCopyId = () => {
    navigator.clipboard.writeText(id).then(
      () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
        setMenuOpen(false);
      },
      (err) => {
        console.error('Failed to copy:', err);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
      }
    );
  };

  const handleEnterSpace = () => {
    if (id) {
      navigate(`/dashboard/open?id=${encodeURIComponent(id)}`);
    }
  };

  return (
    <div
      className="relative bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
      role="region"
      aria-label={`Space: ${title}`}
    >
      {showNotification && (
        <div
          className="absolute top-2 right-2 bg-green-600 text-white text-sm px-4 py-2 rounded shadow-lg z-10 animate-fade-in-out"
          role="alert"
        >
          {navigator.clipboard ? 'Space ID copied!' : 'Failed to copy ID'}
        </div>
      )}

      <div className="flex justify-between items-start mb-4 relative">
        <div className="flex items-center">
          <div className={`w-10 h-10 ${iconColor}/20 rounded-full flex items-center justify-center mr-3`}>
            <i className={`fas ${iconClass} ${iconColor}`} aria-hidden="true"></i>
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-400">{createdOrJoined}</p>
          </div>
        </div>

        <div className="relative">
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-ellipsis-v'}`} aria-hidden="true"></i>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-gray-700 rounded shadow-lg z-20">
              <button
                onClick={handleCopyId}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                aria-label="Copy Space ID"
              >
                Copy Space ID
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
          className="rounded whitespace-nowrap bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 transition-all duration-300"
          aria-label={`Enter ${title} space`}
        >
          Enter Space
        </button>
      </div>
    </div>
  );
};

export default SpaceCard;