// import React from 'react';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getSocket } from '../../utils/socket';


// const OfficeMap = ({ isChatbarVisible, toggleChatbar, isSmallScreen, spaceId }) => {
//   const [socket, setSocket] = useState(null);
//   const navigate = useNavigate();
//   const handleLeaveRoom = () => {
//       if (socket) {
//         socket.emit('leaveSpace', { spaceId });
//         socket.on('leftSpace', () => {
//           console.log('Left space:', spaceId);
//           navigate('/dashboard');
//         });
//       }
//     };

//     useEffect(()=>{
//   setTimeout(() => {
//         if (getSocket()) {
//           setSocket(getSocket());
//         }
//       }, 1000);
//     },[])
//   return (
//     <div
//       className={`relative bg-white ${
//         isSmallScreen
//           ? isChatbarVisible
//             ? 'w-0 hidden'
//             : 'w-full'
//           : isChatbarVisible
//           ? 'w-full md:w-[70%]'
//           : 'w-full'
//       } h-full transition-all duration-300 ${isSmallScreen ? 'pointer-events-none' : ''}`}
//     >
//       <button
//         onClick={handleLeaveRoom}
//         className="fixed top-4 right-4 z-20 p-2 sm:p-3 bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 sm:gap-2 text-sm sm:text-base"
//         aria-label="Exit space"
//       >
//         <i className="fas fa-sign-out-alt sm:mr-1"></i>
//         <span className="hidden sm:inline">Exit</span>
//       </button>
//       <div className="w-full h-full flex items-center justify-center bg-gray-200">
//         <p className="text-lg md:text-xl font-semibold text-gray-600">
//           Office Map Placeholder
//         </p>
//       </div>
//       {isSmallScreen && (
//         <div className="absolute inset-0 bg-white/10 backdrop-blur-[8px] border border-white/20 flex items-center justify-center">
//           <p className="text-white text-sm md:text-base font-medium text-center px-4">
//             Use larger screen devices for best experience.
//           </p>
//         </div>
//       )}
//       {!isSmallScreen && (
//         <button
//           onClick={toggleChatbar}
//           className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-100 rounded-full shadow-md"
//         >
//           <i className={`fas ${isChatbarVisible ? 'fa-chevron-right' : 'fa-comments'}`}></i>
//         </button>
//       )}
//     </div>
//   );
// };

// export default OfficeMap;



import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSocket } from '../../utils/socket';

const OfficeMap = ({ isChatbarVisible, toggleChatbar, isSmallScreen, spaceId }) => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit('leaveSpace', { spaceId });
      socket.on('leftSpace', () => {
        console.log('Left space:', spaceId);
        navigate('/dashboard');
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (getSocket()) {
        setSocket(getSocket());
      }
    }, 1000);
  }, []);

  return (
    <div
      className={`relative bg-white ${
        isSmallScreen
          ? isChatbarVisible
            ? 'w-0 hidden'
            : 'w-full'
          : isChatbarVisible
          ? 'w-full md:w-[70%]'
          : 'w-full'
      } h-full transition-all duration-300`}
    >
      <button
        onClick={handleLeaveRoom}
        className="fixed bottom-4 left-4 z-20 p-2 sm:p-3 bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 sm:gap-2 text-sm sm:text-base pointer-events-auto"
        aria-label="Exit space"
      >
        <i className="fas fa-sign-out-alt sm:mr-1"></i>
        <span className="hidden sm:inline">Exit</span>
      </button>
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <p className="text-lg md:text-xl font-semibold text-gray-600">
          Office Map Placeholder
        </p>
      </div>
      {isSmallScreen && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[8px] border border-white/20 flex items-center justify-center pointer-events-none">
          <p className="text-gray-600 text-3xl md:text-base font-medium text-center px-4">
            Use larger screen devices for best experience.
          </p>
        </div>
      )}
      {!isSmallScreen && (
        <button
          onClick={toggleChatbar}
          className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-100 rounded-full shadow-md"
        >
          <i className={`fas ${isChatbarVisible ? 'fa-chevron-right' : 'fa-comments'}`}></i>
        </button>
      )}
    </div>
  );
};

export default OfficeMap;