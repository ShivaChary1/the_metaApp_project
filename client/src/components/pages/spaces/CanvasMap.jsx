import { useRef, useState } from 'react';
import useAvatarMovement from './hooks/useAvatarMovement';
import useSocketMovementSync from './hooks/useSocketMovementSync';
import usePersistPosition from './hooks/usePersistPosition';
import Avatar from './Avatar';

const CanvasMap = ({ socket, spaceId, currentUsers }) => {
  const canvasRef = useRef(null);
  const [view, setView] = useState({ offsetX: 0, offsetY: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const { positions, setPositions, localUserId, localPositionRef } = useAvatarMovement(socket, spaceId, currentUsers);
  useSocketMovementSync(socket, setPositions);
  usePersistPosition(spaceId, localUserId, localPositionRef);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - view.offsetX,
      y: e.clientY - view.offsetY,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setView((v) => ({
      ...v,
      offsetX: e.clientX - dragStart.current.x,
      offsetY: e.clientY - dragStart.current.y,
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setView((v) => ({ ...v, scale: Math.min(3, Math.max(0.5, v.scale + delta)) }));
  };

  return (
    <div
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      className="relative w-full h-full overflow-hidden"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {currentUsers.map(({ user }) => (
        <Avatar
          key={user._id}
          id={user._id}
          name={user.fullName}
          isLocal={user._id === localUserId}
          position={positions[user._id]}
          view={view}
        />
      ))}
    </div>
  );
};

export default CanvasMap;






// import { useEffect, useRef, useState } from 'react';
// import axios from 'axios';

// const CanvasMap = ({ socket, spaceId, currentUsers }) => {
//   const canvasRef = useRef(null);
//   const [positions, setPositions] = useState({});
//   const user = JSON.parse(localStorage.getItem('currUser'));
//   const localUserId = user.userId;
//   const baseURL = import.meta.env.VITE_BACKEND_URL;

//   const [view, setView] = useState({ offsetX: 0, offsetY: 0, scale: 1 });
//   const [isDragging, setIsDragging] = useState(false);
//   const dragStart = useRef({ x: 0, y: 0 });
//   const localPositionRef = useRef(null);

//   // Initialize positions
//   useEffect(() => {
//     const initial = {};
//     currentUsers.forEach(({ user, position }) => {
//       initial[user._id] = position || { x: 50, y: 50 };
//     });
//     setPositions(initial);
//   }, [currentUsers]);

//   // Handle keyboard movement for local user
//   useEffect(() => {
//     const moveSpeed = 5;

//     const handleKeyDown = (e) => {
//       const key = e.key;
//       if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) return;

//       setPositions((prev) => {
//         const newPos = { ...prev };
//         const curr = { ...(newPos[localUserId] || { x: 50, y: 50 }) };

//         if (key === 'ArrowUp') curr.y -= moveSpeed;
//         else if (key === 'ArrowDown') curr.y += moveSpeed;
//         else if (key === 'ArrowLeft') curr.x -= moveSpeed;
//         else if (key === 'ArrowRight') curr.x += moveSpeed;

//         newPos[localUserId] = curr;
//         localPositionRef.current = curr;

//         socket?.emit('move-avatar', {
//           spaceId,
//           userId: localUserId,
//           position: curr,
//         });

//         return newPos;
//       });
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [socket, spaceId, localUserId]);

//   // Listen for movement updates from other users
//   useEffect(() => {
//     if (!socket) return;

//     const handleMove = ({ userId, position }) => {
//       setPositions((prev) => ({ ...prev, [userId]: position }));
//     };

//     socket.on('avatar-moved', handleMove);
//     return () => socket.off('avatar-moved', handleMove);
//   }, [socket]);

//   // Persist local user position every 5 seconds
//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     const interval = setInterval(() => {
//       const curr = localPositionRef.current;
//       if (!curr) return;

//       axios.post(
//         `${baseURL}/spaces/updatespace`,
//         {
//           spaceId,
//           userId: localUserId,
//           position: curr,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       ).catch((err) => {
//         console.error('Error saving position to server:', err);
//       });
//     }, 5000); // every 5 seconds

//     return () => clearInterval(interval);
//   }, [baseURL, localUserId, spaceId]);

//   // Map dragging
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     dragStart.current = {
//       x: e.clientX - view.offsetX,
//       y: e.clientY - view.offsetY,
//     };
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     setView((v) => ({
//       ...v,
//       offsetX: e.clientX - dragStart.current.x,
//       offsetY: e.clientY - dragStart.current.y,
//     }));
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleWheel = (e) => {
//     e.preventDefault();
//     const delta = e.deltaY < 0 ? 0.1 : -0.1;
//     setView((v) => ({ ...v, scale: Math.min(3, Math.max(0.5, v.scale + delta)) }));
//   };

//   const canvasStyle = {
//     width: '100%',
//     height: '100%',
//     overflow: 'hidden',
//     position: 'relative',
//     cursor: isDragging ? 'grabbing' : 'grab',
//   };

//   // Render avatars from currentUsers + synced positions
//   const renderAvatars = () => {
//     return currentUsers.map(({ user }) => {
//       const id = user._id;
//       const pos = positions[id] || { x: 50, y: 50 };
//       const name = user.fullName || 'User';
//       const initials = name[0]?.toUpperCase() || 'U';
//       const isLocal = id === localUserId;

//       return (
//         <div
//           key={id}
//           style={{
//             position: 'absolute',
//             left: pos.x * view.scale + view.offsetX,
//             top: pos.y * view.scale + view.offsetY,
//             transform: 'translate(-50%, -50%)',
//             zIndex: isLocal ? 2 : 1,
//           }}
//           className="flex flex-col items-center"
//         >
//           <div
//             className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md ${
//               isLocal ? 'bg-blue-500' : 'bg-gray-600'
//             }`}
//           >
//             {initials}
//           </div>
//           <span className="text-xs mt-1 bg-white px-1 rounded shadow-sm">{name}</span>
//         </div>
//       );
//     });
//   };

//   return (
//     <div
//       ref={canvasRef}
//       style={canvasStyle}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onWheel={handleWheel}
//     >
//       {renderAvatars()}
//     </div>
//   );
// };

// export default CanvasMap;

