import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dropdown menus
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // Navigation items with dropdowns
  const navItems = [
    { 
      name: 'Home', 
      path: '/' 
    },
    { 
      name: 'Products', 
      path: '#',
      dropdown: [
        { name: 'Featured', path: '/products/featured' },
        { name: 'New Arrivals', path: '/products/new' },
        { name: 'Best Sellers', path: '/products/best-sellers' }
      ]
    },
    { 
      name: 'Services', 
      path: '#',
      dropdown: [
        { name: 'Consulting', path: '/services/consulting' },
        { name: 'Development', path: '/services/development' },
        { name: 'Support', path: '/services/support' }
      ]
    },
    { 
      name: 'About', 
      path: '/about' 
    },
    { 
      name: 'Contact', 
      path: '/contact' 
    }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black shadow-lg text-gray-800' 
          : 'bg-transparent text-gray'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="font-bold text-xl flex items-center">
              <span className={`${scrolled ? 'text-blue-600' : 'text-gray-800'}`}>
                Brand<span className="text-blue-500">Logo</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.dropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(index)}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-opacity-20 ${
                          scrolled ? 'hover:bg-gray-200' : 'hover:bg-gray'
                        }`}
                      >
                        {item.name}
                        {activeDropdown === index ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                      {activeDropdown === index && (
                        <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            {item.dropdown.map((dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownIndex}
                                to={dropdownItem.path}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={closeMobileMenu}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        scrolled 
                          ? 'hover:bg-gray-200 hover:bg-opacity-50' 
                          : 'hover:bg-black hover:bg-opacity-20'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-200' 
                  : 'text-black hover:bg-gray-800 hover:bg-opacity-20'
              } focus:outline-none`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 ${scrolled ? 'bg-white' : 'bg-gray-900'}`}>
          {navItems.map((item, index) => (
            <div key={index} className="w-full">
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className={`w-full flex justify-between items-center px-3 py-2 text-base font-medium rounded-md ${
                      scrolled 
                        ? 'text-gray-700 hover:bg-gray-200' 
                        : 'text-white hover:bg-gray-700'
                    }`}
                  >
                    {item.name}
                    {activeDropdown === index ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </button>
                  {activeDropdown === index && (
                    <div className={`pl-4 ${scrolled ? 'bg-gray-100' : 'bg-gray-800'}`}>
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.path}
                          className={`block px-3 py-2 text-base font-medium ${
                            scrolled 
                              ? 'text-gray-700 hover:bg-gray-200' 
                              : 'text-gray-300 hover:bg-gray-700 hover:text-black'
                          }`}
                          onClick={closeMobileMenu}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    scrolled 
                      ? 'text-gray-700 hover:bg-gray-200' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-black'
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
