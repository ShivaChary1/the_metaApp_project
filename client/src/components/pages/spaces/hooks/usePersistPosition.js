import { useEffect } from 'react';
import axios from 'axios';

const usePersistPosition = (spaceId, localUserId, localPositionRef) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');

    const interval = setInterval(() => {
      const curr = localPositionRef.current;
      if (!curr) return;

      axios.post(
        `${baseURL}/spaces/updatespace`,
        {
          spaceId,
          userId: localUserId,
          position: curr,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).catch((err) => {
        console.error('Error saving position to server:', err);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [baseURL, localUserId, spaceId, localPositionRef]);
};

export default usePersistPosition;
