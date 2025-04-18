import React from 'react';
import SpaceCard from './SpaceCard';

const JoinedSpaces = ({ spaces }) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Joined Spaces</h2>
        <button className="!rounded-button whitespace-nowrap bg-transparent border border-purple-500 text-white font-semibold py-2 px-6 hover:bg-purple-500/10 transition-all duration-300">
          <i className="fas fa-sign-in-alt mr-2"></i>
          Join Space
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <p className="text-gray-400">No spaces found matching your search.</p>
        )}
      </div>
    </section>
  );
};

export default JoinedSpaces;