import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">MetaConnect</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-md text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#demo" className="text-md text-gray-300 hover:text-white transition-colors">Demo</a>
          <a href="#tech" className="text-md text-gray-300 hover:text-white transition-colors">Technology</a>
          <a href="#cta" className="text-md text-gray-300 hover:text-white transition-colors">Get Started</a>
        </nav>
        
      </div>
    </header>
  );
};

export default Header;