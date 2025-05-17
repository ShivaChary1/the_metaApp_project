// import { useEffect, useState, useRef } from 'react';

// const useAvatarMovement = (socket, spaceId, currentUsers) => {
//   const [positions, setPositions] = useState({});
//   const user = JSON.parse(localStorage.getItem('currUser'));
//   const localUserId = user.userId;
//   const localPositionRef = useRef(null);

//   useEffect(() => {
//     const initial = {};
//     currentUsers.forEach(({ user, position }) => {
//       initial[user._id] = position || { x: 50, y: 50 };
//     });
//     setPositions(initial);
//   }, [currentUsers]);

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

//         socket?.emit('move-avatar', { spaceId, userId: localUserId, position: curr });

//         return newPos;
//       });
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [socket, spaceId, localUserId]);

//   return { positions, setPositions, localUserId, localPositionRef };
// };

// export default useAvatarMovement;


// import { useEffect, useState, useRef } from 'react';

// const useAvatarMovement = (socket, spaceId, currentUsers) => {
//   const [positions, setPositions] = useState({});
//   const user = JSON.parse(localStorage.getItem('currUser'));
//   const localUserId = user.userId;
//   const localPositionRef = useRef({ x: 50, y: 50 });
//   const velocityRef = useRef({ x: 0, y: 0 });
//   const keysPressed = useRef(new Set());
//   const lastUpdateRef = useRef({ frame: Date.now(), socket: Date.now() });

//   // Initialize positions
//   useEffect(() => {
//     const initial = {};
//     currentUsers.forEach(({ user, position }) => {
//       initial[user._id] = position || { x: 50, y: 50 };
//     });
//     setPositions(initial);
//     localPositionRef.current = initial[localUserId] || { x: 50, y: 50 };
//   }, [currentUsers, localUserId]);

//   // Handle keyboard input
//   useEffect(() => {
//     const maxSpeed = 1.0; // Pixels per millisecond
//     const acceleration = 0.009; // Acceleration per millisecond
//     const friction = 0.95; // Slowdown factor

//     const handleKeyDown = (e) => {
//       if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
//         e.preventDefault();
//         keysPressed.current.add(e.key);
//       }
//     };

//     const handleKeyUp = (e) => {
//       if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
//         keysPressed.current.delete(e.key);
//       }
//     };

//     // Update movement
//     const updateMovement = () => {
//       const now = Date.now();
//       const deltaTime = now - lastUpdateRef.current.frame;
//       lastUpdateRef.current.frame = now;

//       let targetVelocity = { x: 0, y: 0 };

//       // Calculate target velocity based on pressed keys
//       if (keysPressed.current.has('ArrowUp')) targetVelocity.y -= maxSpeed;
//       if (keysPressed.current.has('ArrowDown')) targetVelocity.y += maxSpeed;
//       if (keysPressed.current.has('ArrowLeft')) targetVelocity.x -= maxSpeed;
//       if (keysPressed.current.has('ArrowRight')) targetVelocity.x += maxSpeed;

//       // Normalize diagonal movement to maintain consistent speed
//       const speed = Math.sqrt(targetVelocity.x ** 2 + targetVelocity.y ** 2);
//       if (speed > maxSpeed) {
//         targetVelocity.x = (targetVelocity.x / speed) * maxSpeed;
//         targetVelocity.y = (targetVelocity.y / speed) * maxSpeed;
//       }

//       // Apply acceleration
//       velocityRef.current.x +=
//         (targetVelocity.x - velocityRef.current.x) * acceleration * deltaTime;
//       velocityRef.current.y +=
//         (targetVelocity.y - velocityRef.current.y) * acceleration * deltaTime;

//       // Apply friction
//       velocityRef.current.x *= friction;
//       velocityRef.current.y *= friction;

//       // Update position
//       setPositions((prev) => {
//         const newPos = { ...prev };
//         const curr = { ...localPositionRef.current };

//         curr.x += velocityRef.current.x * deltaTime;
//         curr.y += velocityRef.current.y * deltaTime;

//         // Optional: Add boundary checks
//         curr.x = Math.max(0, Math.min(curr.x, 1000)); // Adjust bounds as needed
//         curr.y = Math.max(0, Math.min(curr.y, 1000));

//         newPos[localUserId] = curr;
//         localPositionRef.current = curr;

//         // Emit position update to server (throttle to 60Hz)
//         const now = Date.now();
//         if (now - lastUpdateRef.current.socket > 16.67) {
//           socket?.emit('move-avatar', { spaceId, userId: localUserId, position: curr });
//           lastUpdateRef.current.socket = now;
//         }

//         return newPos;
//       });

//       requestAnimationFrame(updateMovement);
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);
//     const animationId = requestAnimationFrame(updateMovement);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//       cancelAnimationFrame(animationId);
//     };
//   }, [socket, spaceId, localUserId]);

//   return { positions, setPositions, localUserId, localPositionRef };
// };

// export default useAvatarMovement;


// import { useEffect, useState, useRef } from 'react';

// const useAvatarMovement = (socket, spaceId, currentUsers, boundingBox) => {
//   const [positions, setPositions] = useState({});
//   const user = JSON.parse(localStorage.getItem('currUser'));
//   const localUserId = user.userId;
//   const localPositionRef = useRef({ x: 50, y: 50 });
//   const velocityRef = useRef({ x: 0, y: 0 });
//   const keysPressed = useRef(new Set());
//   const lastUpdateRef = useRef({ frame: Date.now(), socket: Date.now() });

//   // Clamp function to keep values within bounds
//   const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

//   // Initialize positions
//   useEffect(() => {
//     const initial = {};
//     currentUsers.forEach(({ user, position }) => {
//       initial[user._id] = position || { x: 50, y: 50 };
//     });
//     setPositions(initial);
//     localPositionRef.current = initial[localUserId] || { x: 50, y: 50 };
//   }, [currentUsers, localUserId]);

//   // Handle keyboard input and movement
//   useEffect(() => {
//     if (!boundingBox) return; // Wait for bounding box to be available

//     const maxSpeed = 10;      // Faster speed
//     const acceleration = 0.15; // Faster acceleration
//     const friction = 0.8; // Slower friction

//     const handleKeyDown = (e) => {
//       if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
//         e.preventDefault();
//         keysPressed.current.add(e.key);
//       }
//     };

//     const handleKeyUp = (e) => {
//       if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
//         keysPressed.current.delete(e.key);
//       }
//     };

//     const updateMovement = () => {
//       const now = Date.now();
//       const deltaTime = now - lastUpdateRef.current.frame;
//       lastUpdateRef.current.frame = now;

//       let targetVelocity = { x: 0, y: 0 };

//       if (keysPressed.current.has('ArrowUp')) targetVelocity.y -= maxSpeed;
//       if (keysPressed.current.has('ArrowDown')) targetVelocity.y += maxSpeed;
//       if (keysPressed.current.has('ArrowLeft')) targetVelocity.x -= maxSpeed;
//       if (keysPressed.current.has('ArrowRight')) targetVelocity.x += maxSpeed;

//       // Normalize diagonal speed
//       const speed = Math.sqrt(targetVelocity.x ** 2 + targetVelocity.y ** 2);
//       if (speed > maxSpeed) {
//         targetVelocity.x = (targetVelocity.x / speed) * maxSpeed;
//         targetVelocity.y = (targetVelocity.y / speed) * maxSpeed;
//       }

//       // Accelerate and apply friction
//       velocityRef.current.x +=
//         (targetVelocity.x - velocityRef.current.x) * acceleration * deltaTime;
//       velocityRef.current.y +=
//         (targetVelocity.y - velocityRef.current.y) * acceleration * deltaTime;

//       velocityRef.current.x *= friction;
//       velocityRef.current.y *= friction;

//       // Update position with clamping inside bounding box
//       setPositions((prev) => {
//         const newPos = { ...prev };
//         const curr = { ...localPositionRef.current };

//         curr.x += velocityRef.current.x * deltaTime;
//         curr.y += velocityRef.current.y * deltaTime;

//         curr.x = clamp(curr.x, boundingBox.minX, boundingBox.maxX);
//         curr.y = clamp(curr.y, boundingBox.minY, boundingBox.maxY);

//         newPos[localUserId] = curr;
//         localPositionRef.current = curr;

//         // Throttle socket emits ~60Hz
//         if (now - lastUpdateRef.current.socket > 16.67) {
//           socket?.emit('move-avatar', { spaceId, userId: localUserId, position: curr });
//           lastUpdateRef.current.socket = now;
//         }

//         return newPos;
//       });

//       requestAnimationFrame(updateMovement);
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     const animationId = requestAnimationFrame(updateMovement);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//       cancelAnimationFrame(animationId);
//     };
//   }, [socket, spaceId, localUserId, boundingBox]);

//   return { positions, setPositions, localUserId, localPositionRef };
// };

// export default useAvatarMovement;


import { useEffect, useState, useRef } from 'react';

const useAvatarMovement = (socket, spaceId, currentUsers, boundingBox) => {
  const [positions, setPositions] = useState({});
  const user = JSON.parse(localStorage.getItem('currUser'));
  const localUserId = user.userId;
  const localPositionRef = useRef({ x: 50, y: 50 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const keysPressed = useRef(new Set());
  const lastUpdateRef = useRef({ frame: Date.now(), socket: Date.now() });

  // Clamp function to keep values within bounds
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

  // Handle keyboard input and movement
  useEffect(() => {
    if (!boundingBox) return; // Wait for bounding box to be available

    const maxSpeed = 0.4; // Reduced from 0.5 for slightly slower movement
    const acceleration = 0.05; // Unchanged for smooth velocity transitions
    const friction = 0.95; // Unchanged for gradual deceleration
    const maxDeltaTime = 33.33;  // Cap at ~30fps to prevent jumps

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
      let deltaTime = Math.min(now - lastUpdateRef.current.frame, maxDeltaTime);
      lastUpdateRef.current.frame = now;

      let targetVelocity = { x: 0, y: 0 };

      // Calculate target velocity based on pressed keys
      if (keysPressed.current.has('ArrowUp')) targetVelocity.y -= maxSpeed;
      if (keysPressed.current.has('ArrowDown')) targetVelocity.y += maxSpeed;
      if (keysPressed.current.has('ArrowLeft')) targetVelocity.x -= maxSpeed;
      if (keysPressed.current.has('ArrowRight')) targetVelocity.x += maxSpeed;

      // Normalize diagonal speed
      const speed = Math.sqrt(targetVelocity.x ** 2 + targetVelocity.y ** 2);
      if (speed > maxSpeed) {
        targetVelocity.x = (targetVelocity.x / speed) * maxSpeed;
        targetVelocity.y = (targetVelocity.y / speed) * maxSpeed;
      }

      // Accelerate and apply friction
      velocityRef.current.x +=
        (targetVelocity.x - velocityRef.current.x) * acceleration * deltaTime;
      velocityRef.current.y +=
        (targetVelocity.y - velocityRef.current.y) * acceleration * deltaTime;

      velocityRef.current.x *= Math.pow(friction, deltaTime / 16.67);
      velocityRef.current.y *= Math.pow(friction, deltaTime / 16.67);

      // Update position with clamping inside bounding box
      setPositions((prev) => {
        const newPos = { ...prev };
        const curr = { ...localPositionRef.current };

        curr.x += velocityRef.current.x * deltaTime;
        curr.y += velocityRef.current.y * deltaTime;

        curr.x = clamp(curr.x, boundingBox.minX, boundingBox.maxX);
        curr.y = clamp(curr.y, boundingBox.minY, boundingBox.maxY);

        newPos[localUserId] = curr;
        localPositionRef.current = curr;

        // Throttle socket emits to exactly 60Hz
        if (now - lastUpdateRef.current.socket >= 16.67) {
          socket?.emit('move-avatar', { spaceId, userId: localUserId, position: curr });
          lastUpdateRef.current.socket = now;
        }

        return newPos;
      });

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

  return { positions, setPositions, localUserId, localPositionRef };
};

export default useAvatarMovement;