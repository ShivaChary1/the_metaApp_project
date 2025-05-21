import { useRef, useState, useEffect } from 'react';
import seedrandom from 'seedrandom';
import useAvatarMovement from './hooks/useAvatarMovement';
import useSocketMovementSync from './hooks/useSocketMovementSync';
import usePersistPosition from './hooks/usePersistPosition';
import Avatar from './Avatar';
import useZegoCall from './hooks/useZegoCall';

const ROOM_NAMES = [
  'Meeting Room', 'Working Area', 'Private Room A', 'Private Room B',
  'Cafeteria', 'Living Area', 'Breakout Zone', 'Focus Pod', 'Team Hub'
];

const getRandomPastelColor = (rng) => {
  const hue = Math.floor(rng() * 360);
  return `hsl(${hue}, 100%, 85%)`;
};

const generateNonOverlappingRooms = (roomCount = 7, maxAttempts = 1000, seed = 'fixed-seed') => {
  const rng = seedrandom(seed);
  const rooms = [];
  const widthRange = [300, 500];
  const heightRange = [200, 400];

  let attempts = 0;
  while (rooms.length < roomCount && attempts < maxAttempts) {
    const width = Math.floor(rng() * (widthRange[1] - widthRange[0])) + widthRange[0];
    const height = Math.floor(rng() * (heightRange[1] - heightRange[0])) + heightRange[0];
    const x = Math.floor(rng() * 2000) + 100;
    const y = Math.floor(rng() * 1000) + 100;

    const newRoom = { x, y, width, height };

    const overlaps = rooms.some(room =>
      x < room.x + room.width &&
      x + width > room.x &&
      y < room.y + room.height &&
      y + height > room.y
    );

    if (!overlaps) {
      rooms.push({
        ...newRoom,
        name: ROOM_NAMES[rooms.length % ROOM_NAMES.length],
        color: getRandomPastelColor(rng),
      });
    }

    attempts++;
  }

  return rooms;
};

const getRoomsBoundingBox = (rooms, padding = 100) => {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  rooms.forEach(({ x, y, width, height }) => {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x + width > maxX) maxX = x + width;
    if (y + height > maxY) maxY = y + height;
  });

  return {
    minX: minX - padding,
    minY: minY - padding,
    maxX: maxX + padding,
    maxY: maxY + padding,
  };
};

const CanvasMap = ({ socket, spaceId, currentUsers }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [view, setView] = useState({ offsetX: 0, offsetY: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const [rooms] = useState(() => generateNonOverlappingRooms(7, 1000, spaceId));
  const boundingBox = getRoomsBoundingBox(rooms, 100);

  const { positions, setPositions, localUserId, localPositionRef, nearbyUsers } = useAvatarMovement(socket, spaceId, currentUsers, boundingBox);
  useSocketMovementSync(socket, setPositions);
  usePersistPosition(spaceId, localUserId, localPositionRef);
  const zegoContainerRef = useZegoCall(localUserId, nearbyUsers, spaceId);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      const { offsetX, offsetY, scale } = view;
      const width = canvas.width = canvas.offsetWidth;
      const height = canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      const gridSize = 50;
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      for (let x = -offsetX % (gridSize * scale); x < width; x += gridSize * scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -offsetY % (gridSize * scale); y < height; y += gridSize * scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      rooms.forEach(({ name, x, y, width: w, height: h, color }) => {
        const rectX = x * scale + offsetX;
        const rectY = y * scale + offsetY;
        const rectW = w * scale;
        const rectH = h * scale;

        ctx.fillStyle = color;
        ctx.fillRect(rectX, rectY, rectW, rectH);

        ctx.strokeStyle = '#00000030';
        ctx.strokeRect(rectX, rectY, rectW, rectH);

        ctx.fillStyle = '#111';
        ctx.font = `${14 * scale}px sans-serif`;
        ctx.fillText(name, rectX + 10, rectY + 20);
      });
    };

    draw();
  }, [view, rooms]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      setView((v) => ({
        ...v,
        scale: Math.min(3, Math.max(0.3, v.scale + delta)),
      }));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);
  
  useEffect(() => {
  const container = containerRef.current;
  const localPos = positions[localUserId];
  if (!container || !localPos) return;

  const centerViewOnAvatar = () => {
    setView((v) => ({
      ...v,
      offsetX: container.clientWidth / 2 - localPos.x * v.scale,
      offsetY: container.clientHeight / 2 - localPos.y * v.scale,
    }));
  };

  centerViewOnAvatar();
}, [positions[localUserId]]);


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

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
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
        {nearbyUsers.length > 0 && (
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-row items-center gap-2 z-50 bg-gray-800/80 rounded-md p-2"
            style={{ boxSizing: 'border-box' }}
          >
            <div
              id="remote-videos-container"
              ref={zegoContainerRef}
              // className="flex flex-row items-center gap-2"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CanvasMap;