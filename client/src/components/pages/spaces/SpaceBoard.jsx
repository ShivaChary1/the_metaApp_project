// import React, { useState, useEffect } from 'react';
// import OfficeMap from './OfficeMap';
// import Chatbar from './Chatbar';
// import { useNavigate } from 'react-router-dom';
// import { getSocket } from '../../utils/socket';
// import { useParams } from 'react-router-dom';

// const Spaceboard = () => {
//   const { spaceId } = useParams();
//   const [isChatbarVisible, setIsChatbarVisible] = useState(true);
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const navigate = useNavigate();

//   const toggleChatbar = () => {
//     setIsChatbarVisible(!isChatbarVisible);
//   };

//   const handleLeaveRoom = () => {
//     if(socket){
//       socket.emit('leaveSpace', { spaceId });
//       socket.on('leftSpace', () => {
//         console.log('Left space:', spaceId);
//         navigate('/dashboard');
//       });
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 768);
//     };
//     handleResize();
//     setTimeout(()=>{
//         if(getSocket()){
//         setSocket(getSocket());
//         }
//     },1000)
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div className="relative flex h-screen bg-gray-100 overflow-hidden">
//       <button
//         onClick={handleLeaveRoom}
//         className="fixed top-4 left-4 cursor-pointer z-20 p-2 md:p-3 bg-red-500 hover:bg-red-400 text-white rounded-full shadow-md flex items-center gap-2 text-sm md:text-base"
//       >
//         <i className="fas fa-sign-out-alt"></i>
//         Exit
//       </button>
//       <OfficeMap
//         isChatbarVisible={isChatbarVisible}
//         toggleChatbar={toggleChatbar}
//         isSmallScreen={isSmallScreen}
//       />
//       <Chatbar
//         isVisible={isChatbarVisible}
//         toggleChatbar={toggleChatbar}
//         isSmallScreen={isSmallScreen}
//         spaceId={spaceId}
//       />
//     </div>
//   );
// };

// export default Spaceboard;

import React, { useState, useEffect } from 'react';
import OfficeMap from './OfficeMap';
import Chatbar from './Chatbar';
import {  useParams } from 'react-router-dom';

const Spaceboard = () => {
  const { spaceId } = useParams();
  const [isChatbarVisible, setIsChatbarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  

  const toggleChatbar = () => {
    setIsChatbarVisible(!isChatbarVisible);
  };

  

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative flex h-screen bg-gray-100 overflow-hidden">
      
      <OfficeMap
        isChatbarVisible={isChatbarVisible}
        toggleChatbar={toggleChatbar}
        isSmallScreen={isSmallScreen}
        spaceId = {spaceId}
      />
      <Chatbar
        isVisible={isChatbarVisible}
        toggleChatbar={toggleChatbar}
        isSmallScreen={isSmallScreen}
        spaceId={spaceId}
      />
    </div>
  );
};

export default Spaceboard;