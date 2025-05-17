import { useEffect, useState, useRef } from 'react';

const useAvatarMovement = (socket, spaceId, currentUsers) => {
  const [positions, setPositions] = useState({});
  const user = JSON.parse(localStorage.getItem('currUser'));
  const localUserId = user.userId;
  const localPositionRef = useRef(null);

  useEffect(() => {
    const initial = {};
    currentUsers.forEach(({ user, position }) => {
      initial[user._id] = position || { x: 50, y: 50 };
    });
    setPositions(initial);
  }, [currentUsers]);

  useEffect(() => {
    const moveSpeed = 5;
    const handleKeyDown = (e) => {
      const key = e.key;
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) return;

      setPositions((prev) => {
        const newPos = { ...prev };
        const curr = { ...(newPos[localUserId] || { x: 50, y: 50 }) };

        if (key === 'ArrowUp') curr.y -= moveSpeed;
        else if (key === 'ArrowDown') curr.y += moveSpeed;
        else if (key === 'ArrowLeft') curr.x -= moveSpeed;
        else if (key === 'ArrowRight') curr.x += moveSpeed;

        newPos[localUserId] = curr;
        localPositionRef.current = curr;

        socket?.emit('move-avatar', { spaceId, userId: localUserId, position: curr });

        return newPos;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [socket, spaceId, localUserId]);

  return { positions, setPositions, localUserId, localPositionRef };
};

export default useAvatarMovement;
