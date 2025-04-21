import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const MainCanvas = ({
  currentPosition,
  isMoving,
  direction,
  users,
  currUser,
  isMicOn,
  isCameraOn,
  spaceName,
}) => (
  <div className="relative flex-1 bg-gray-100 overflow-hidden">
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10 pointer-events-none">
      {Array.from({ length: 12 }).map((_, rowIndex) =>
        Array.from({ length: 12 }).map((_, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="border border-gray-400"></div>
        ))
      )}
    </div>
    <div className="absolute left-[10%] top-[10%] w-[80%] h-[80%] border-2 border-indigo-200 bg-indigo-50 bg-opacity-40 rounded-lg">
      <div className="absolute -top-3 left-4 bg-white px-3 py-1 text-sm font-medium text-indigo-600 rounded-full shadow-sm">
        {spaceName}
      </div>
    </div>
    <Avatar
      position={currentPosition}
      isMoving={isMoving}
      direction={direction}
      name={currUser.name || 'You'}
      isCurrentUser={true}
      isMicOn={isMicOn}
      isCameraOn={isCameraOn}
    />
    {users
      .filter((user) => user.id !== currUser._id)
      .map((user) => (
        <Avatar
          key={user.uniqueKey}
          position={user.position}
          isMoving={false}
          direction="down"
          name={user.name}
          isCurrentUser={false}
          isMicOn={user.status === 'online'}
          isCameraOn={user.status === 'online'}
        />
      ))}
    <div className="hidden md:hidden absolute bottom-4 left-4">
      <div className="w-24 h-24 bg-white bg-opacity-50 rounded-full relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-indigo-500 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

MainCanvas.propTypes = {
  currentPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  isMoving: PropTypes.bool.isRequired,
  direction: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      uniqueKey: PropTypes.string,
      name: PropTypes.string,
      position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      status: PropTypes.string,
    })
  ).isRequired,
  currUser: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  isMicOn: PropTypes.bool.isRequired,
  isCameraOn: PropTypes.bool.isRequired,
  spaceName: PropTypes.string.isRequired,
};

export default MainCanvas;




// import React from 'react';
// import PropTypes from 'prop-types';
// import Avatar from './Avatar';

// const MainCanvas = ({
//   currentPosition,
//   isMoving,
//   direction,
//   users,
//   currUser,
//   isMicOn,
//   isCameraOn,
//   showInteractionPrompt,
//   spaceName,
// }) => (
//   <div className="relative flex-1 bg-gray-100 overflow-hidden">
//     <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10 pointer-events-none">
//       {Array.from({ length: 12 }).map((_, rowIndex) =>
//         Array.from({ length: 12 }).map((_, colIndex) => (
//           <div key={`${rowIndex}-${colIndex}`} className="border border-gray-400"></div>
//         ))
//       )}
//     </div>
//     <div className="absolute left-[10%] top-[10%] w-[80%] h-[80%] border-2 border-indigo-200 bg-indigo-50 bg-opacity-40 rounded-lg">
//       <div className="absolute -top-3 left-4 bg-white px-3 py-1 text-sm font-medium text-indigo-600 rounded-full shadow-sm">
//         {spaceName}
//       </div>
//     </div>
//     <div className="absolute left-[25%] top-[20%] w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center cursor-pointer">
//       <i className="fas fa-chalkboard text-indigo-500"></i>
//     </div>
//     <Avatar
//       position={currentPosition}
//       isMoving={isMoving}
//       direction={direction}
//       name={currUser.name || 'You'}
//       isCurrentUser={true}
//       isMicOn={isMicOn}
//       isCameraOn={isCameraOn}
//     />
//     {users
//       .filter((user) => user.id !== currUser._id)
//       .map((user) => (
//         <Avatar
//           key={user.id}
//           position={user.position}
//           isMoving={false}
//           direction="down"
//           name={user.name}
//           isCurrentUser={false}
//           isMicOn={user.status === 'online'} // Assume online users have mic on
//           isCameraOn={user.status === 'online'} // Assume online users have camera on
//         />
//       ))}
//     {showInteractionPrompt && (
//       <div className="absolute left-[25%] top-[28%] bg-white rounded-lg shadow-md px-3 py-2 text-sm font-medium animate-bounce">
//         Press <span className="font-bold text-indigo-600">E</span> to interact with whiteboard
//       </div>
//     )}
//     <div className="hidden md:hidden absolute bottom-4 left-4">
//       <div className="w-24 h-24 bg-white bg-opacity-50 rounded-full relative">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-12 h-12 bg-indigo-500 rounded-full"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// MainCanvas.propTypes = {
//   currentPosition: PropTypes.shape({
//     x: PropTypes.number,
//     y: PropTypes.number,
//   }).isRequired,
//   isMoving: PropTypes.bool.isRequired,
//   direction: PropTypes.string.isRequired,
//   users: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//       name: PropTypes.string,
//       position: PropTypes.shape({
//         x: PropTypes.number,
//         y: PropTypes.number,
//       }),
//       status: PropTypes.string,
//     })
//   ).isRequired,
//   currUser: PropTypes.shape({
//     _id: PropTypes.string,
//     name: PropTypes.string,
//   }).isRequired,
//   isMicOn: PropTypes.bool.isRequired,
//   isCameraOn: PropTypes.bool.isRequired,
//   showInteractionPrompt: PropTypes.bool.isRequired,
//   spaceName: PropTypes.string.isRequired,
// };

// export default MainCanvas;


// import React from 'react';
// import PropTypes from 'prop-types';
// import Avatar from './Avatar';

// const MainCanvas = ({
//   currentPosition,
//   isMoving,
//   direction,
//   users,
//   currUser,
//   isMicOn,
//   isCameraOn,
//   spaceName,
// }) => (
//   <div className="relative flex-1 bg-gray-100 overflow-hidden">
//     <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10 pointer-events-none">
//       {Array.from({ length: 12 }).map((_, rowIndex) =>
//         Array.from({ length: 12 }).map((_, colIndex) => (
//           <div key={`${rowIndex}-${colIndex}`} className="border border-gray-400"></div>
//         ))
//       )}
//     </div>
//     <div className="absolute left-[10%] top-[10%] w-[80%] h-[80%] border-2 border-indigo-200 bg-indigo-50 bg-opacity-40 rounded-lg">
//       <div className="absolute -top-3 left-4 bg-white px-3 py-1 text-sm font-medium text-indigo-600 rounded-full shadow-sm">
//         {spaceName}
//       </div>
//     </div>
//     <Avatar
//       position={currentPosition}
//       isMoving={isMoving}
//       direction={direction}
//       name={currUser.name || 'You'}
//       isCurrentUser={true}
//       isMicOn={isMicOn}
//       isCameraOn={isCameraOn}
//     />
//     {users
//       .filter((user) => user.id !== currUser._id)
//       .map((user) => (
//         <Avatar
//           key={user.id}
//           position={user.position}
//           isMoving={false}
//           direction="down"
//           name={user.name}
//           isCurrentUser={false}
//           isMicOn={user.status === 'online'}
//           isCameraOn={user.status === 'online'}
//         />
//       ))}
//     <div className="hidden md:hidden absolute bottom-4 left-4">
//       <div className="w-24 h-24 bg-white bg-opacity-50 rounded-full relative">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-12 h-12 bg-indigo-500 rounded-full"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// MainCanvas.propTypes = {
//   currentPosition: PropTypes.shape({
//     x: PropTypes.number,
//     y: PropTypes.number,
//   }).isRequired,
//   isMoving: PropTypes.bool.isRequired,
//   direction: PropTypes.string.isRequired,
//   users: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//       name: PropTypes.string,
//       position: PropTypes.shape({
//         x: PropTypes.number,
//         y: PropTypes.number,
//       }),
//       status: PropTypes.string,
//     })
//   ).isRequired,
//   currUser: PropTypes.shape({
//     _id: PropTypes.string,
//     name: PropTypes.string,
//   }).isRequired,
//   isMicOn: PropTypes.bool.isRequired,
//   isCameraOn: PropTypes.bool.isRequired,
//   spaceName: PropTypes.string.isRequired,
// };

// export default MainCanvas;