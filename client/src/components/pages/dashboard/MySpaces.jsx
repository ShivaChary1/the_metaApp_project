import React, { useState } from 'react';
import SpaceCard from './SpaceCard';
import CreateSpaceModal from './CreateSpaceModal';

const MySpaces = ({ spaces, currUser, onSpaceCreated }) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <section className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">My Spaces</h2>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="rounded cursor-pointer whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 text-sm sm:text-base transition-all duration-300"
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
                id={space.id}
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
            <p className="text-gray-400 text-sm sm:text-base">No spaces found.</p>
          )}
        </div>
      </section>
      <CreateSpaceModal
        isOpen={isCreateModalOpen}
        setIsOpen={setCreateModalOpen}
        currUser={currUser}
        onSpaceCreated={onSpaceCreated}
      />
    </>
  );
};

export default MySpaces;