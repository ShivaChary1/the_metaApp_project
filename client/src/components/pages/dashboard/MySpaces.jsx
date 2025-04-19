// import React from 'react';
// import SpaceCard from './SpaceCard';

// const MySpaces = ({ spaces }) => {
//   return (
//     <section className="mb-12">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">My Spaces</h2>
//         <button className="rounded cursor-pointer whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-6 transition-all duration-300">
//           <i className="fas fa-plus mr-2"></i>
//           Create New Space
//         </button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
//           <p className="text-gray-400">No spaces found matching your search.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default MySpaces;


import React, { useState } from 'react';
import SpaceCard from './SpaceCard';
import CreateSpaceModal from './CreateSpaceModal';

const MySpaces = ({ spaces, currUser }) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  return (
    <section className="mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">My Spaces</h2>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="rounded whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 text-sm sm:text-base transition-all duration-300"
        >
          <i className="fas fa-plus mr-1 sm:mr-2"></i>
          Create New Space
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {spaces.length > 0 ? (
          spaces.map((space, index) => (
            <SpaceCard
              key={index}
              title={space.title}
              createdOrJoined={space.createdOrJoined}
              participants={space.participants}
              lastActive={space.lastActive}
              iconClass={space.iconClass}
              iconColor={space.iconColor}
              avatars={space.avatars}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm sm:text-base">No spaces found matching your search.</p>
        )}
      </div>
      <CreateSpaceModal
        isOpen={isCreateModalOpen}
        setIsOpen={setCreateModalOpen}
        currUser={currUser}
      />
    </section>
  );
};

export default MySpaces;