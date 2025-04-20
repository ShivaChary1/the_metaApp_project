import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../../assets/hero.png'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10"></div>
        <img 
          src={heroImg} 
          alt="Digital network visualization" 
          className="w-full h-full object-cover object-top"
        />
      </div>
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              MetaConnect
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl">
            Seamless real-time collaboration platform powered by cutting-edge WebRTC and Socket.io technologies.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/dashboard">
              <button className="rounded whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                Create Space
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="rounded whitespace-nowrap bg-transparent border-2 border-purple-500 text-white font-semibold py-3 px-8 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                Join Room
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#features" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors cursor-pointer">
          <span className="text-sm mb-2">Explore</span>
          <i className="fas fa-chevron-down animate-bounce"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;