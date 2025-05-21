// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 py-12 border-t border-gray-800">
//       <div className="container mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//           <div>
//             <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">MetaConnect</div>
//             <p className="text-gray-400 mb-4">
//               The next generation platform for real-time collaboration and communication.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
//                 <i className="fab fa-twitter"></i>
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
//                 <i className="fab fa-github"></i>
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
//                 <i className="fab fa-linkedin"></i>
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
//                 <i className="fab fa-discord"></i>
//               </a>
//             </div>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Product</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Features</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Pricing</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Use Cases</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Security</a></li>
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Resources</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Documentation</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">API Reference</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Blog</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Community</a></li>
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Company</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">About</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Careers</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Legal</a></li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-500 text-sm mb-4 md:mb-0">
//             © 2025 MetaConnect. All rights reserved.
//           </p>
//           <div className="flex space-x-6">
//             <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer">Privacy Policy</a>
//             <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer">Terms of Service</a>
//             <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors cursor-pointer">Cookie Policy</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    let animation;
    if (ref.current) {
      animation = gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
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

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <footer ref={ref} className="bg-gray-900 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          <motion.div variants={linkVariants}>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">MetaConnect</div>
            <p className="text-gray-400 mb-4">
              The next generation platform for real-time collaboration and communication.
            </p>
            <div className="flex space-x-4">
              {['fa-twitter', 'fa-github', 'fa-linkedin', 'fa-discord'].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  variants={linkVariants}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className={`fab ${icon}`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
          {[
            {
              title: 'Product',
              links: ['Features', 'Pricing', 'Use Cases', 'Security'],
            },
            {
              title: 'Resources',
              links: ['Documentation', 'API Reference', 'Blog', 'Community'],
            },
            {
              title: 'Company',
              links: ['About', 'Careers', 'Contact', 'Legal'],
            },
          ].map((section, i) => (
            <motion.div key={i} variants={linkVariants}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <motion.li
                    key={j}
                    variants={linkVariants}
                    whileHover={{ x: 5, color: '#ffffff' }}
                  >
                    <a href="#" className="text-gray-400 transition-colors cursor-pointer">{link}</a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 MetaConnect. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, i) => (
              <motion.a
                key={i}
                href="#"
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                className="text-gray-500 text-sm transition-colors cursor-pointer"
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;