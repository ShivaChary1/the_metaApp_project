// import React from 'react';
// import { Link } from 'react-router-dom';
// import heroImg from '../../../assets/hero.png'

// const Hero = () => {
//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden">
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10"></div>
//         <img 
//           src={heroImg} 
//           alt="Digital network visualization" 
//           className="w-full h-full object-cover object-top"
//         />
//       </div>
      
//       <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10">
//         <div className="w-full md:w-1/2 mb-12 md:mb-0">
//           <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
//               MetaConnect
//             </span>
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl">
//             Seamless real-time collaboration platform powered by cutting-edge WebRTC and Socket.io technologies.
//           </p>
//           <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
//             <Link to="/dashboard">
//               <button className="rounded whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
//                 Create Space
//               </button>
//             </Link>
//             <Link to="/dashboard">
//               <button className="rounded whitespace-nowrap bg-transparent border-2 border-purple-500 text-white font-semibold py-3 px-8 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105 cursor-pointer">
//                 Join Room
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
      
//       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
//         <a href="#features" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors cursor-pointer">
//           <span className="text-sm mb-2">Explore</span>
//           <i className="fas fa-chevron-down animate-bounce"></i>
//         </a>
//       </div>
//     </section>
//   );
// };

// export default Hero;


import React, { useEffect, useRef, forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';
import img from '../../../assets/hero.png'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Hero = forwardRef((props, ref) => {
  const localRef = useRef(null);
  // Use localRef as fallback if forwarded ref is not provided
  const effectiveRef = ref || localRef;
  const isInView = useInView(effectiveRef, { once: false, amount: 0.3 });

  useEffect(() => {
    let animation;
    if (effectiveRef.current) {
      animation = gsap.to('.hero-image', {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: effectiveRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => {
      if (animation) {
        animation.kill();
      }
      if (effectiveRef.current) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === effectiveRef.current) {
            trigger.kill();
          }
        });
      }
    };
  }, [effectiveRef]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section ref={effectiveRef} className="hero-section relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10"></div>
        <img
          src={img}
          alt="Digital network visualization"
          className="hero-image w-full h-full object-cover object-top"
        />
      </div>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10"
      >
        <motion.div variants={childVariants} className="w-full md:w-1/2 mb-12 md:mb-0">
          <motion.h1 variants={childVariants} className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              MetaConnect
            </span>
          </motion.h1>
          <motion.p variants={childVariants} className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl">
            Seamless real-time collaboration platform powered by cutting-edge WebRTC and Socket.io technologies.
          </motion.p>
          <motion.div variants={childVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 shadow-lg transition-all duration-300 cursor-pointer"
              >
                Create Space
              </motion.button>
            </Link>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded whitespace-nowrap bg-transparent border-2 border-purple-500 text-white font-semibold py-3 px-8 hover:bg-purple-500/10 transition-all duration-300 cursor-pointer"
              >
                Join Room
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <a href="#features" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors cursor-pointer">
          <span className="text-sm mb-2">Explore</span>
          <motion.i
            className="fas fa-chevron-down"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          ></motion.i>
        </a>
      </motion.div>
    </section>
  );
});

export default Hero;