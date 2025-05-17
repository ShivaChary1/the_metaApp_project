const Avatar = ({ id, name, isLocal, position = { x: 50, y: 50 }, view }) => {
  const initials = name?.[0]?.toUpperCase() || 'U';

  return (
    <div
      key={id}
      style={{
        position: 'absolute',
        left: position.x * view.scale + view.offsetX,
        top: position.y * view.scale + view.offsetY,
        transform: 'translate(-50%, -50%)',
        zIndex: isLocal ? 2 : 1,
      }}
      className="flex flex-col items-center"
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md ${
          isLocal ? 'bg-blue-500' : 'bg-gray-600'
        }`}
      >
        {initials}
      </div>
      <span className="text-xs mt-1 bg-white px-1 rounded shadow-sm">{name}</span>
    </div>
  );
};

export default Avatar;
