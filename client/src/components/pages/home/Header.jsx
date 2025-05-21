// import React, { useState, useEffect } from 'react';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}>
//       <div className="container mx-auto px-6 flex justify-between items-center">
//         <div className="flex items-center">
//           <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">MetaConnect</span>
//         </div>
        
//         <nav className="hidden md:flex items-center space-x-8">
//           <a href="#features" className="text-md text-gray-300 hover:text-white transition-colors">Features</a>
//           <a href="#demo" className="text-md text-gray-300 hover:text-white transition-colors">Demo</a>
//           <a href="#tech" className="text-md text-gray-300 hover:text-white transition-colors">Technology</a>
//           <a href="#cta" className="text-md text-gray-300 hover:text-white transition-colors">Get Started</a>
//         </nav>
        
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    let animation;
    if (ref.current) {
      animation = gsap.fromTo(
        ref.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animation) {
        animation.kill();
      }
    };
  }, []);

  const navVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <motion.header
      ref={ref}
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center"
        >
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">MetaConnect</span>
        </motion.div>
        <motion.nav
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={navVariants}
          className="hidden md:flex items-center space-x-8"
        >
          {['Features', 'Demo', 'Technology', 'Get Started'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              variants={navItemVariants}
              whileHover={{ scale: 1.05, color: '#ffffff' }}
              className="text-md text-gray-300 transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;