import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section id="cta" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started with MetaConnect</h2>
          <p className="text-xl text-gray-300 mb-8">
            Log in or register to join thousands of users collaborating in real-time. Start your journey with MetaConnect today!
          </p>
        </div>
        
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6 mb-8">
            <Link to='/login'>
              <button className="!rounded-button whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                Log In
              </button>
            </Link>
            <Link to='/register'>
              <button className="!rounded-button whitespace-nowrap bg-transparent border-2 border-purple-500 text-white font-semibold py-3 px-8 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                Register
              </button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <i className="fas fa-users mr-2"></i>
            <span>1,248 active users • 356 rooms currently active</span>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">Need more information?</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link></Link>
            <button className="!rounded-button whitespace-nowrap bg-transparent border border-gray-600 text-white font-semibold py-3 px-8 hover:bg-gray-800 transition-all duration-300 cursor-pointer">
              <i className="fas fa-book mr-2"></i>
              Documentation
            </button>

            <button className="!rounded-button whitespace-nowrap bg-transparent border border-gray-600 text-white font-semibold py-3 px-8 hover:bg-gray-800 transition-all duration-300 cursor-pointer">
              <i className="fas fa-headset mr-2"></i>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;