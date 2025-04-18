import React from 'react';

const Tech = () => {
  return (
    <section id="tech" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technology Stack</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built with modern, powerful technologies to ensure reliability, performance, and scalability.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <i className="fab fa-react text-3xl text-blue-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">React</h3>
            <p className="text-gray-400 text-sm">
              Frontend UI library for building interactive components
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <i className="fab fa-node-js text-3xl text-green-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Node.js</h3>
            <p className="text-gray-400 text-sm">
              Server-side JavaScript runtime environment
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-plug text-3xl text-yellow-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Socket.io</h3>
            <p className="text-gray-400 text-sm">
              Real-time bidirectional event-based communication
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-video text-3xl text-purple-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">WebRTC</h3>
            <p className="text-gray-400 text-sm">
              Peer-to-peer communication for audio, video, and data
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-database text-3xl text-red-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">MongoDB</h3>
            <p className="text-gray-400 text-sm">
              NoSQL database for storing user and room data
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
            <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-lock text-3xl text-pink-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">JWT</h3>
            <p className="text-gray-400 text-sm">
              Secure authentication and authorization
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
              <i className="fab fa-docker text-3xl text-cyan-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Docker</h3>
            <p className="text-gray-400 text-sm">
              Containerization for consistent deployment
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-cloud text-3xl text-orange-400"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">AWS</h3>
            <p className="text-gray-400 text-sm">
              Cloud infrastructure for scalable deployment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tech;