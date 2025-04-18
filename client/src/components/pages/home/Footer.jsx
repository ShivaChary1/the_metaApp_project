import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">MetaConnect</div>
            <p className="text-gray-400 mb-4">
              The next generation platform for real-time collaboration and communication.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Use Cases</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Legal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 MetaConnect. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;