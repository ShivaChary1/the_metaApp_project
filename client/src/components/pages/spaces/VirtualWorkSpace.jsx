// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import Navbar from './NavBar';
// import MainCanvas from './MainCanvas';
// import Sidebar from './SideBar';
// import SettingsModal from './SettingsModal';
// import './styles.css';

// const VirtualWorkspace = ({ space, currUser }) => {
//   const baseURL = import.meta.env.VITE_BACKEND_URL;
//   const [showSettings, setShowSettings] = useState(false);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isPrivateChat, setIsPrivateChat] = useState(false);
//   const [currentPosition, setCurrentPosition] = useState(() => {
//     if (space && Array.isArray(space.currentUsers)) {
//       const user = space.currentUsers.find((u) => (u.user?.$oid || u.user) === currUser.userId);
//       return user ? user.position : { x: 50, y: 50 };
//     }
//     return { x: 50, y: 50 };
//   });
//   const [isMoving, setIsMoving] = useState(false);
//   const [direction, setDirection] = useState('down');
//   const [users, setUsers] = useState([]);

//   // Fetch user details for currentUsers
//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         if (!space || !Array.isArray(space.currentUsers)) {
//           console.warn('No valid currentUsers array provided');
//           setUsers([]);
//           return;
//         }
//         console.log(space.currentUsers[0].user._id)
//         const userData = await Promise.all(
//           space.currentUsers.map(async (u, index) => {
//             try {
//               const userId = u.user._id;
//               const response = await axios.get(`${baseURL}/users/getuser`, { params:{userId}, withCredentials: true });
//               const details = response.data;
//               return {
//                 id: userId,
//                 name: details.name || 'Unknown',
//                 status: details.status || 'online',
//                 location: space.name || 'Love Room',
//                 activity: details.activity || 'Available',
//                 position: u.position,
//                 uniqueKey: u._id || `${userId}-${index}`, // Ensure unique key
//               };
//             } catch (error) {
//               console.error(`Failed to fetch user ${u.user}:`, error);
//               return {
//                 id: u.user?.$oid || u.user,
//                 name: 'Unknown',
//                 status: 'offline',
//                 location: space.name || 'Love Room',
//                 activity: '—',
//                 position: u.position,
//                 uniqueKey: u._id || `${u.user?.$oid || u.user}-${index}`,
//               };
//             }
//           })
//         );
//         setUsers(userData);
//       } catch (error) {
//         console.error('Error loading users:', error);
//         setUsers([]);
//       }
//     };
//     loadUsers();
//   }, [space, currUser]);

//   // Avatar movement controls
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       const speed = 5;
//       let newX = currentPosition.x;
//       let newY = currentPosition.y;
//       let newDirection = direction;

//       switch (e.key) {
//         case 'ArrowUp':
//         case 'w':
//         case 'W':
//           newY = Math.max(0, currentPosition.y - speed);
//           newDirection = 'up';
//           break;
//         case 'ArrowDown':
//         case 's':
//         case 'S':
//           newY = Math.min(100, currentPosition.y + speed);
//           newDirection = 'down';
//           break;
//         case 'ArrowLeft':
//         case 'a':
//         case 'A':
//           newX = Math.max(0, currentPosition.x - speed);
//           newDirection = 'left';
//           break;
//         case 'ArrowRight':
//         case 'd':
//         case 'D':
//           newX = Math.min(100, currentPosition.x + speed);
//           newDirection = 'right';
//           break;
//         default:
//           return;
//       }

//       setCurrentPosition({ x: newX, y: newY });
//       setDirection(newDirection);
//       setIsMoving(true);

//       setTimeout(() => setIsMoving(false), 200);
//       // TODO: Update position in backend via Socket.IO
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [currentPosition, direction]);

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const message = {
//         id: chatMessages.length + 1,
//         user: currUser.name || 'You',
//         message: newMessage,
//         isPrivate: isPrivateChat,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       };
//       setChatMessages([...chatMessages, message]);
//       setNewMessage('');
//       // TODO: Send message to backend via Socket.IO
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   if (!space || !space.name) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-600">
//         Loading space...
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen w-full bg-gray-50 overflow-hidden">
//       <Navbar
//         isMicOn={isMicOn}
//         isCameraOn={isCameraOn}
//         toggleMic={() => setIsMicOn(!isMicOn)}
//         toggleCamera={() => setIsCameraOn(!isCameraOn)}
//         toggleSettings={() => setShowSettings(!showSettings)}
//       />
//       <div className="flex flex-1 overflow-hidden">
//         <MainCanvas
//           currentPosition={currentPosition}
//           isMoving={isMoving}
//           direction={direction}
//           users={users}
//           currUser={currUser}
//           isMicOn={isMicOn}
//           isCameraOn={isCameraOn}
//           spaceName={space.name}
//         />
//         <Sidebar
//           showSidebar={showSidebar}
//           toggleSidebar={() => setShowSidebar(!showSidebar)}
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           chatMessages={chatMessages}
//           newMessage={newMessage}
//           setNewMessage={setNewMessage}
//           isPrivateChat={isPrivateChat}
//           setIsPrivateChat={setIsPrivateChat}
//           handleSendMessage={handleSendMessage}
//           handleKeyPress={handleKeyPress}
//           users={users}
//           space={space}
//         />
//       </div>
//       {!showSidebar && (
//         <button
//           className="absolute right-4 top-20 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center text-gray-500 cursor-pointer !rounded-button whitespace-nowrap"
//           onClick={() => setShowSidebar(true)}
//         >
//           <i className="fas fa-chevron-left"></i>
//         </button>
//       )}
//       {showSettings && <SettingsModal toggleSettings={() => setShowSettings(!showSettings)} />}
//     </div>
//   );
// };

// VirtualWorkspace.propTypes = {
//   space: PropTypes.shape({
//     _id: PropTypes.string,
//     name: PropTypes.string,
//     maxUsers: PropTypes.number,
//     currentUsers: PropTypes.arrayOf(
//       PropTypes.shape({
//         user: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ $oid: PropTypes.string })]),
//         position: PropTypes.shape({
//           x: PropTypes.number,
//           y: PropTypes.number,
//         }),
//         _id: PropTypes.string,
//       })
//     ),
//     owner: PropTypes.string,
//   }),
//   currUser: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     name: PropTypes.string,
//   }).isRequired,
// };

// export default VirtualWorkspace;


import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Navbar from './Navbar';
import MainCanvas from './MainCanvas';
import Sidebar from './Sidebar';
import SettingsModal from './SettingsModal';
import './styles.css';

const VirtualWorkspace = ({ space, currUser }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isPrivateChat, setIsPrivateChat] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(() => {
    if (space && Array.isArray(space.currentUsers)) {
      const user = space.currentUsers.find((u) => u.user?._id === currUser.userId);
      return user ? user.position : { x: 50, y: 50 };
    }
    return { x: 50, y: 50 };
  });
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState('down');
  const [users, setUsers] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  const socket = io(import.meta.env.VITE_BACKEND_URL, {
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  const debounceTimeout = useRef(null);
  const debounceEmit = (data) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      if (socketConnected) {
        console.log('Emitting updatePosition:', data);
        socket.emit('updatePosition', data);
      } else {
        console.warn('Socket not connected, cannot emit updatePosition:', data);
      }
    }, 100);
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      setSocketConnected(true);
      if (space && space._id && currUser.userId) {
        console.log('Emitting joinSpace:', { spaceId: space._id, userId: currUser.userId });
        socket.emit('joinSpace', { spaceId: space._id, userId: currUser.userId });
      } else {
        console.error('Cannot join space: missing data', { spaceId: space?._id, userId: currUser.userId });
      }
    });

    socket.on('positionUpdated', ({ userId, position }) => {
      console.log('Received position update:', { userId, position });
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) =>
          user.id === userId ? { ...user, position } : user
        );
        console.log('Updated users state:', updatedUsers);
        return updatedUsers;
      });
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
      setSocketConnected(false);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setSocketConnected(false);
    });

    return () => {
      socket.disconnect();
      console.log('Socket cleanup');
    };
  }, [space, currUser, socket]);

  useEffect(() => {
    const loadUsers = () => {
      try {
        if (!space || !Array.isArray(space.currentUsers)) {
          console.warn('No valid currentUsers array provided');
          setUsers([]);
          return;
        }

        const userData = space.currentUsers
          .filter(u => u.user && u.user._id && u.position)
          .map((u, index) => {
            try {
              const userId = u.user._id;
              return {
                id: userId,
                name: u.user.fullName || 'Unknown',
                status: 'online',
                location: space.name || 'Love Room',
                activity: 'Available',
                position: u.position,
                uniqueKey: u._id || `${userId}-${index}`,
              };
            } catch (error) {
              console.error(`Failed to process user ${u.user?._id}:`, error);
              return null;
            }
          })
          .filter(user => user !== null);
        console.log('Loaded users:', userData);
        setUsers(userData);
      } catch (error) {
        console.error('Error loading users:', error);
        setUsers([]);
      }
    };
    loadUsers();
  }, [space]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const speed = 5;
      let newX = currentPosition.x;
      let newY = currentPosition.y;
      let newDirection = direction;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          newY = Math.max(0, currentPosition.y - speed);
          newDirection = 'up';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newY = Math.min(100, currentPosition.y + speed);
          newDirection = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newX = Math.max(0, currentPosition.x - speed);
          newDirection = 'left';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          newX = Math.min(100, currentPosition.x + speed);
          newDirection = 'right';
          break;
        default:
          return;
      }

      const newPosition = { x: newX, y: newY };
      setCurrentPosition(newPosition);
      setDirection(newDirection);
      setIsMoving(true);

      if (space && space._id && currUser.userId) {
        debounceEmit({
          spaceId: space._id,
          userId: currUser.userId,
          position: newPosition,
        });
      } else {
        console.error('Cannot emit updatePosition: missing data', {
          spaceId: space?._id,
          userId: currUser.userId,
          position: newPosition,
        });
      }

      setTimeout(() => setIsMoving(false), 200);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPosition, direction, space, currUser, socketConnected]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        user: currUser.name || 'You',
        message: newMessage,
        isPrivate: isPrivateChat,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!space || !space.name) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading space...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 overflow-hidden">
      <Navbar
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        toggleMic={() => setIsMicOn(!isMicOn)}
        toggleCamera={() => setIsCameraOn(!isCameraOn)}
        toggleSettings={() => setShowSettings(!showSettings)}
      />
      <div className="flex flex-1 overflow-hidden">
        <MainCanvas
          currentPosition={currentPosition}
          isMoving={isMoving}
          direction={direction}
          users={users}
          currUser={currUser}
          isMicOn={isMicOn}
          isCameraOn={isCameraOn}
          spaceName={space.name}
        />
        <Sidebar
          showSidebar={showSidebar}
          toggleSidebar={() => setShowSidebar(!showSidebar)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          chatMessages={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          isPrivateChat={isPrivateChat}
          setIsPrivateChat={setIsPrivateChat}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          users={users}
          space={space}
        />
      </div>
      {!showSidebar && (
        <button
          className="absolute right-4 top-20 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center text-gray-500 cursor-pointer !rounded-button whitespace-nowrap"
          onClick={() => setShowSidebar(true)}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      )}
      {showSettings && <SettingsModal toggleSettings={() => setShowSettings(!showSettings)} />}
    </div>
  );
};

VirtualWorkspace.propTypes = {
  space: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    maxUsers: PropTypes.number,
    currentUsers: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.shape({
          _id: PropTypes.string,
          fullName: PropTypes.string,
        }),
        position: PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number,
        }),
        _id: PropTypes.string,
      })
    ),
    owner: PropTypes.string,
  }),
  currUser: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

export default VirtualWorkspace;