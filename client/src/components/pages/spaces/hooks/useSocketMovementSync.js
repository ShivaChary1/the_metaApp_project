import { useEffect } from 'react';

const useSocketMovementSync = (socket, setPositions) => {
  useEffect(() => {
    if (!socket) return;

    const handleMove = ({ userId, position }) => {
      setPositions((prev) => ({ ...prev, [userId]: position }));
    };

    socket.on('avatar-moved', handleMove);
    return () => socket.off('avatar-moved', handleMove);
  }, [socket, setPositions]);
};

export default useSocketMovementSync;
