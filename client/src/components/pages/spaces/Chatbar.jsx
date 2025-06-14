
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';

// const Chatbar = ({ isVisible, toggleChatbar, isSmallScreen, spaceId }) => {
//   const [message, setMessage] = useState('');
//   const [allMessages, setAllMessages] = useState([]);
//   const baseURL = import.meta.env.VITE_BACKEND_URL;
//   const user = JSON.parse(localStorage.getItem('currUser'));
//   const token = localStorage.getItem('token');
//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [allMessages]);

//   const handleSend = async () => {
//     if (message.trim() === '') return;
//     console.log('Sending message with user:', user);
//     socketRef.current.emit('message-sent', {
//       message,
//       spaceId,
//       userId: user.userId,
//       fullName: user.fullName
//     });
//     setMessage('');
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   useEffect(() => {
//     socketRef.current = io(baseURL, {
//       auth: { token }
//     });

//     socketRef.current.on('connect_error', (err) => {
//       console.error('Socket connection error:', err);
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!spaceId || !socketRef.current) return;

//     const socket = socketRef.current;
//     socket.emit('enteredSpace', { spaceId });

//     const handleIncoming = ({ message, userId, fullName, timestamp }) => {
//       console.log('Received message:', { message, userId, fullName, timestamp });
//       setAllMessages(prev => [...prev, {
//         message,
//         user: { _id: userId, fullName: fullName || 'Unknown User' },
//         timestamp
//       }]);
//     };

//     socket.on('message-received', handleIncoming);

//     return () => {
//       socket.emit('leaveSpace', { spaceId });
//       socket.off('message-received', handleIncoming);
//     };
//   }, [spaceId]);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/chats/getchat`, {
//           params: { spaceId },
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setAllMessages(response.data.chats.chats || []);
//       } catch (err) {
//         console.log("Cannot fetch chats", err);
//       }
//     };

//     fetchChats();
//   }, [spaceId]);

//   return (
//     <div
//       className={`bg-white border-l border-gray-200 ${
//         isSmallScreen
//           ? isVisible
//             ? 'w-full opacity-100'
//             : 'w-0 opacity-0'
//           : isVisible
//           ? 'w-full md:w-[30%] opacity-100'
//           : 'w-0 opacity-0'
//       } h-full transition-all duration-300 flex flex-col shadow-md overflow-hidden`}
//     >
//       <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
//         <h2 className="font-semibold text-gray-800 text-base md:text-lg">Team Chat</h2>
//         {isSmallScreen && (
//           <button
//             onClick={toggleChatbar}
//             className="p-2 bg-white hover:bg-gray-100 rounded-full shadow-md"
//           >
//             <i className="fas fa-times"></i>
//           </button>
//         )}
//       </div>
//       <div className="flex-1 p-4 overflow-y-auto">
//         {allMessages.map((entry, index) => {
//           const isCurrUser = entry.user?._id === user.userId;
//           return (
//             <div
//               key={index}
//               className={`mb-2 flex ${isCurrUser ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-xs px-3 py-2 rounded-lg text-sm shadow-md ${
//                   isCurrUser
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-200 text-gray-800'
//                 }`}
//               >
//                 {!isCurrUser && (
//                   <div className="font-semibold text-xs mb-1">
//                     {entry.user?.fullName || 'Fetching name...'}
//                   </div>
//                 )}
//                 {entry.message}
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="p-3 border-t border-gray-200">
//         <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Type a message..."
//             className="flex-1 bg-transparent border-none focus:outline-none resize-none text-sm max-h-24"
//             rows={1}
//           />
//           <button
//             onClick={handleSend}
//             className={`ml-2  p-2 rounded-full ${
//               message.trim() ? 'text-blue-500 cursor-pointer' : 'text-gray-500 disabled'
//             }`}
//             disabled={!message.trim()}
//           >
//             <i className="fas fa-paper-plane"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbar;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const Chatbar = ({ isVisible, toggleChatbar, isSmallScreen, spaceId }) => {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const user = JSON.parse(localStorage.getItem('currUser'));
  const token = localStorage.getItem('token');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [spaceName,setSpaceName] = useState(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  const handleSend = async () => {
    if (message.trim() === '') return;
    socketRef.current.emit('message-sent', {
      message,
      spaceId,
      userId: user.userId,
      fullName: user.fullName
    });
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    socketRef.current = io(baseURL, {
      auth: { token }
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!spaceId || !socketRef.current) return;

    const socket = socketRef.current;
    socket.emit('enteredSpace', { spaceId });

    const handleIncoming = ({ message, userId, fullName, timestamp }) => {
      setAllMessages(prev => [...prev, {
        message,
        user: { _id: userId, fullName: fullName || 'Unknown User' },
        timestamp
      }]);
    };

    socket.on('message-received', handleIncoming);

    return () => {
      socket.emit('leaveSpace', { spaceId });
      socket.off('message-received', handleIncoming);
    };
  }, [spaceId]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${baseURL}/chats/getchat`, {
          params: { spaceId },
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllMessages(response.data.chats.chats || []);
        setSpaceName(response.data.chats.spaceId.name)
      } catch (err) {
        console.log("Cannot fetch chats", err);
      }
    };
    fetchChats();
  }, [spaceId]);

  return (
    <div
      className={`bg-gray-800/80 backdrop-blur-md border-l border-gray-700/50 ${
        isSmallScreen
          ? isVisible
            ? 'w-full opacity-100'
            : 'w-0 opacity-0'
          : isVisible
          ? 'w-full md:w-[30%] opacity-100'
          : 'w-0 opacity-0'
      } h-full transition-all duration-500 ease-out flex flex-col shadow-2xl overflow-hidden`}
    >
      <div className="px-4 py-3 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-md flex justify-between items-center">
        <h2 className="font-semibold text-white text-base md:text-lg transition-all duration-300">
          {spaceName}
        </h2>
        {isSmallScreen && (
          <button
            onClick={toggleChatbar}
            className="p-2 bg-gray-800/80 backdrop-blur-md hover:bg-gray-700/80 rounded-full shadow-md text-gray-300 hover:text-white transition-all duration-300"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {allMessages.map((entry, index) => {
          const isCurrUser = entry.user?._id === user.userId;
          return (
            <div
              key={index}
              className={`mb-3 flex ${isCurrUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm shadow-lg transition-all duration-300 ${
                  isCurrUser
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-700/80 backdrop-blur-md text-gray-200'
                }`}
              >
                {!isCurrUser && (
                  <div className="font-semibold text-xs mb-1 text-gray-300">
                    {entry.user?.fullName || 'Fetching name...'}
                  </div>
                )}
                {entry.message}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 border-t border-gray-700/50">
        <div className="flex items-center bg-gray-900/80 backdrop-blur-md rounded-lg px-3 py-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:outline-none resize-none text-sm max-h-24 text-white placeholder-gray-400 transition-all duration-300"
            rows={1}
          />
          <button
            onClick={handleSend}
            className={`ml-2 p-2 rounded-full ${
              message.trim()
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            } transition-all duration-300 shadow-md`}
            disabled={!message.trim()}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbar;