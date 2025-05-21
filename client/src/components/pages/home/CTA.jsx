// import React from 'react';
// import { Link } from 'react-router-dom';

// const CTA = () => {
//   return (
//     <section id="cta" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
//       <div className="container mx-auto px-6 relative z-10">
//         <div className="max-w-4xl mx-auto text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started with MetaConnect</h2>
//           <p className="text-xl text-gray-300 mb-8">
//             Log in or register to join thousands of users collaborating in real-time. Start your journey with MetaConnect today!
//           </p>
//         </div>
        
//         <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700 max-w-3xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6 mb-8">
//             <Link to='/login'>
//               <button className="!rounded-button whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
//                 Log In
//               </button>
//             </Link>
//             <Link to='/register'>
//               <button className="!rounded-button whitespace-nowrap bg-transparent border-2 border-purple-500 text-white font-semibold py-3 px-8 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105 cursor-pointer">
//                 Register
//               </button>
//             </Link>
//           </div>
          
//           <div className="flex items-center justify-center text-gray-400 text-sm">
//             <i className="fas fa-users mr-2"></i>
//             <span>1,248 active users • 356 rooms currently active</span>
//           </div>
//         </div>
        
//         <div className="mt-16 text-center">
//           <p className="text-gray-400 mb-6">Need more information?</p>
//           <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <Link></Link>
//             <button className="!rounded-button whitespace-nowrap bg-transparent border border-gray-600 text-white font-semibold py-3 px-8 hover:bg-gray-800 transition-all duration-300 cursor-pointer">
//               <i className="fas fa-book mr-2"></i>
//               Documentation
//             </button>

//             <button className="!rounded-button whitespace-nowrap bg-transparent border border-gray-600 text-white font-semibold py-3 px-8 hover:bg-gray-800 transition-all duration-300 cursor-pointer">
//               <i className="fas fa-headset mr-2"></i>
//               Contact Support
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CTA;

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    let animation;
    if (ref.current) {
      animation = gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
          },
        }
      );
    }

    return () => {
      if (animation) {
        animation.kill();
      }
      if (ref.current) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === ref.current) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <section id="cta" ref={ref} className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started with MetaConnect</h2>
          <p className="text-xl text-gray-300 mb-8">
            Log in or register to join thousands of users collaborating in real-time. Start your journey with MetaConnect today!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700 max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6 mb-8">
            <Link to="/login">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="!rounded-button whitespace-nowrap bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 shadow-lg transition-all duration-300 cursor-pointer"
              >
                Log In
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="!rounded-button whitespace-nowrap bg-transparent border-2 border-purple-500 text-white font-semibold py-3 px-8 hover:bg-purple-500/10 transition-all duration-300 cursor-pointer"
              >
                Register
              </motion.button>
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center justify-center text-gray-400 text-sm"
          >
            <i className="fas fa-users mr-2"></i>
            <span>1,248 active users • 356 rooms currently active</span>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">Need more information?</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/docs">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="!rounded-button whitespace-nowrap bg-transparent border border-gray-600 text-white font-semibold py-3 px-8 hover:bg-gray-800 transition-all duration-300 cursor-pointer"
              >
                <i className="fas fa-book mr-2"></i>
                Documentation
              </motion.button>
            </Link>
            <Link to="/support">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="!rounded-button whitespace-nowrap bg-transparent border border-gray-600 text-white font-semibold py-3 px-8 hover:bg-gray-800 transition-all duration-300 cursor-pointer"
              >
                <i className="fas fa-headset mr-2"></i>
                Contact Support
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;