import { useEffect, useState, useRef } from 'react';

const useAvatarMovement = (socket, spaceId, currentUsers, boundingBox) => {
  const [positions, setPositions] = useState({});
  const [distances, setDistances] = useState({});
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('currUser'));
  const localUserId = user?.userId || '';
  const localPositionRef = useRef({ x: 50, y: 50 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const keysPressed = useRef(new Set());
  const lastUpdateRef = useRef({ frame: Date.now(), socket: Date.now(), state: Date.now() });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // Initialize positions
  useEffect(() => {
    const initial = {};
    currentUsers.forEach(({ user, position }) => {
      initial[user._id] = position || { x: 50, y: 50 };
    });
    setPositions(initial);
    localPositionRef.current = initial[localUserId] || { x: 50, y: 50 };
  }, [currentUsers, localUserId]);

  // Update distances and nearby users
  useEffect(() => {
    const localPos = positions[localUserId];
    if (!localPos) return;

    const newDistances = {};
    const newNearbyUsers = [];

    Object.entries(positions).forEach(([userId, pos]) => {
      if (userId !== localUserId && pos) {
        const dx = pos.x - localPos.x;
        const dy = pos.y - localPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        newDistances[userId] = distance;
        if (distance < 30) {
          newNearbyUsers.push(userId);
        }
      }
    });

    setDistances(newDistances);
    setNearbyUsers((prev) => {
      const changed =
        newNearbyUsers.length !== prev.length ||
        !newNearbyUsers.every((id) => prev.includes(id));
      return changed ? newNearbyUsers : prev;
    });
  }, [positions, localUserId]);

  // Movement handling
  useEffect(() => {
    if (!boundingBox || !socket) return;

    const maxSpeed = 0.4;
    const acceleration = 0.05;
    const friction = 0.95;
    const maxDeltaTime = 33.33;
    const stateUpdateInterval = 100; // Update state every 100ms

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        keysPressed.current.add(e.key);
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        keysPressed.current.delete(e.key);
      }
    };

    const updateMovement = () => {
      const now = Date.now();
      const deltaTime = Math.min(now - lastUpdateRef.current.frame, maxDeltaTime);
      lastUpdateRef.current.frame = now;

      let targetVelocity = { x: 0, y: 0 };

      if (keysPressed.current.has('ArrowUp')) targetVelocity.y -= maxSpeed;
      if (keysPressed.current.has('ArrowDown')) targetVelocity.y += maxSpeed;
      if (keysPressed.current.has('ArrowLeft')) targetVelocity.x -= maxSpeed;
      if (keysPressed.current.has('ArrowRight')) targetVelocity.x += maxSpeed;

      const speed = Math.sqrt(targetVelocity.x ** 2 + targetVelocity.y ** 2);
      if (speed > maxSpeed) {
        targetVelocity.x = (targetVelocity.x / speed) * maxSpeed;
        targetVelocity.y = (targetVelocity.y / speed) * maxSpeed;
      }

      velocityRef.current.x += (targetVelocity.x - velocityRef.current.x) * acceleration * deltaTime;
      velocityRef.current.y += (targetVelocity.y - velocityRef.current.y) * acceleration * deltaTime;

      velocityRef.current.x *= Math.pow(friction, deltaTime / 16.67);
      velocityRef.current.y *= Math.pow(friction, deltaTime / 16.67);

      const curr = { ...localPositionRef.current };
      curr.x += velocityRef.current.x * deltaTime;
      curr.y += velocityRef.current.y * deltaTime;

      curr.x = clamp(curr.x, boundingBox.minX, boundingBox.maxX);
      curr.y = clamp(curr.y, boundingBox.minY, boundingBox.maxY);
      localPositionRef.current = curr;

      // Update state periodically
      if (now - lastUpdateRef.current.state >= stateUpdateInterval) {
        setPositions((prev) => ({
          ...prev,
          [localUserId]: curr,
        }));
        lastUpdateRef.current.state = now;
      }

      // Emit to socket
      if (now - lastUpdateRef.current.socket >= 16.67) {
        socket.emit('move-avatar', { spaceId, userId: localUserId, position: curr });
        lastUpdateRef.current.socket = now;
      }

      requestAnimationFrame(updateMovement);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    const animationId = requestAnimationFrame(updateMovement);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [socket, spaceId, localUserId, boundingBox]);

  return {
    positions,
    setPositions,
    localUserId,
    localPositionRef,
    distances,
    nearbyUsers,
  };
};

export default useAvatarMovement;