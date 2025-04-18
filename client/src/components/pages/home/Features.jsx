import React from 'react';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the cutting-edge capabilities that make MetaConnect the ultimate collaboration platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-users text-2xl text-blue-400"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Real-time Collaboration</h3>
            <p className="text-gray-400">
              Work together seamlessly with multiple users in the same virtual space. Changes appear instantly for all participants.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-plug text-2xl text-purple-400"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Socket.io Integration</h3>
            <p className="text-gray-400">
              Powered by Socket.io for reliable, low-latency communication between clients and servers, ensuring data consistency.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-video text-2xl text-pink-400"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">WebRTC Connections</h3>
            <p className="text-gray-400">
              Establish secure peer-to-peer connections for high-quality video, audio, and data sharing without server latency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;