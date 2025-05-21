// import React, { useState, useEffect } from 'react';
// import OfficeMap from './OfficeMap';
// import Chatbar from './Chatbar';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { getSocket } from '../../utils/socket';

// const Spaceboard = () => {
//   const { spaceId } = useParams();
//   const [currentUsers, setCurrentUsers] = useState([]);
//   const [isChatbarVisible, setIsChatbarVisible] = useState(true);
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const baseURL = import.meta.env.VITE_BACKEND_URL;

//   const toggleChatbar = () => {
//     setIsChatbarVisible(!isChatbarVisible);
//   };
  

//   useEffect(() => {
//     const socket = getSocket();
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           `${baseURL}/spaces/getspace`,
//           {
//             params: { id: spaceId },
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             },
//           }
//         );
//         setCurrentUsers(response.data.currentUsers);
//         setIsLoading(false);
       
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setIsLoading(false);
//       }
//     };
    

//     fetchUsers();

//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 768);
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (socket) {
//         socket.emit('leaveSpace', { spaceId });
        
//       }
//     };
//   }, [spaceId]);

//   if (isLoading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gray-100">
//         <p className="text-lg font-semibold text-gray-600">Loading space...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative flex h-screen bg-gray-100 overflow-hidden">
//       <OfficeMap
//         isChatbarVisible={isChatbarVisible}
//         toggleChatbar={toggleChatbar}
//         isSmallScreen={isSmallScreen}
//         spaceId={spaceId}
//         currentUsers={currentUsers}
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
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getSocket } from '../../utils/socket';

const Spaceboard = () => {
  const { spaceId } = useParams();
  const [currentUsers, setCurrentUsers] = useState([]);
  const [isChatbarVisible, setIsChatbarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const toggleChatbar = () => {
    setIsChatbarVisible(!isChatbarVisible);
  };

  useEffect(() => {
    const socket = getSocket();
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/spaces/getspace`,
          {
            params: { id: spaceId },
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setCurrentUsers(response.data.currentUsers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchUsers();

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (socket) {
        socket.emit('leaveSpace', { spaceId });
      }
    };
  }, [spaceId]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <p className="text-lg font-semibold text-gray-300 animate-pulse">Loading space...</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <OfficeMap
        isChatbarVisible={isChatbarVisible}
        toggleChatbar={toggleChatbar}
        isSmallScreen={isSmallScreen}
        spaceId={spaceId}
        currentUsers={currentUsers}
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