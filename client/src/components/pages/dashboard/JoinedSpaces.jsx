// import React, { useState } from 'react';
// import SpaceCard from './SpaceCard';
// import JoinSpaceModal from './JoinSpaceModal';

// const JoinedSpaces = ({ spaces }) => {
//   const [isJoinModalOpen, setJoinModalOpen] = useState(false);

//   return (
//     <section>
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
//         <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">Joined Spaces</h2>
//         <button
//           onClick={() => setJoinModalOpen(true)}
//           className="rounded whitespace-nowrap bg-transparent border border-purple-500 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 text-sm sm:text-base hover:bg-purple-500/10 transition-all duration-300"
//         >
//           <i className="fas fa-sign-in-alt mr-1 sm:mr-2"></i>
//           Join Space
//         </button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//         {spaces.length > 0 ? (
//           spaces.map((space, index) => (
//             <SpaceCard
//               key={index}
//               title={space.title}
//               createdOrJoined={space.createdOrJoined}
//               participants={space.participants}
//               lastActive={space.lastActive}
//               iconClass={space.iconClass}
//               iconColor={space.iconColor}
//               avatars={space.avatars}
//             />
//           ))
//         ) : (
//           <p className="text-gray-400 text-sm sm:text-base">No spaces found.</p>
//         )}
//       </div>
//       <JoinSpaceModal
//         isOpen={isJoinModalOpen}
//         setIsOpen={setJoinModalOpen}
//       />
//     </section>
//   );
// };

// export default JoinedSpaces;

import React, { useState } from 'react';
import SpaceCard from './SpaceCard';
import JoinSpaceModal from './JoinSpaceModal';

const JoinedSpaces = ({ spaces, onSpaceJoined }) => {
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">Joined Spaces</h2>
        <button
          onClick={() => setJoinModalOpen(true)}
          className="rounded cursor-pointer whitespace-nowrap bg-transparent border border-purple-500 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 text-sm sm:text-base hover:bg-purple-500/10 transition-all duration-300"
        >
          <i className="fas fa-sign-in-alt mr-1 sm:mr-2"></i>
          Join Space
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {spaces.length > 0 ? (
          spaces.map((space, index) => (
            <SpaceCard
              key={index}
              title={space.title}
              id={space.id}
              createdOrJoined={space.createdOrJoined}
              participants={space.participants}
              lastActive={space.lastActive}
              iconClass={space.iconClass}
              iconColor={space.iconColor}
              avatars={space.avatars}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm sm:text-base">No spaces found.</p>
        )}
      </div>
      <JoinSpaceModal
        isOpen={isJoinModalOpen}
        setIsOpen={setJoinModalOpen}
        onSpaceJoined={onSpaceJoined}
      />
    </section>
  );
};

export default JoinedSpaces;