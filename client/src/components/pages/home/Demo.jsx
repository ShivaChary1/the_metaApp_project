// import React from 'react';

// const Demo = () => {
//   return (
//     <section id="demo" className="py-20 bg-gray-800">
//       <div className="container mx-auto px-6">
//         <div className="flex flex-col md:flex-row items-center">
//           <div className="w-full md:w-1/2 mb-12 md:mb-0">
//             <h2 className="text-4xl font-bold mb-6">See It In Action</h2>
//             <p className="text-xl text-gray-400 mb-8">
//               Experience the power of MetaConnect with our interactive demonstration. Connect, collaborate, and create in real-time.
//             </p>
            
//             <div className="space-y-6">
//               <div className="flex items-start">
//                 <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-4 mt-1">
//                   <span className="text-blue-400 font-bold">1</span>
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold mb-2">Create a Space</h3>
//                   <p className="text-gray-400">Generate a unique room with custom settings and permissions.</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start">
//                 <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mr-4 mt-1">
//                   <span className="text-purple-400 font-bold">2</span>
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold mb-2">Invite Participants</h3>
//                   <p className="text-gray-400">Share your room link with teammates for instant access.</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start">
//                 <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center mr-4 mt-1">
//                   <span className="text-pink-400 font-bold">3</span>
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold mb-2">Collaborate in Real-time</h3>
//                   <p className="text-gray-400">Experience seamless interaction with zero latency.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="w-full md:w-1/2">
//             <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700">
//               <div className="bg-gray-900 p-3 border-b border-gray-700 flex items-center">
//                 <div className="flex space-x-2">
//                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                 </div>
//                 <div className="mx-auto text-sm text-gray-400">MetaConnect Demo</div>
//               </div>
//               <div className="relative">
//                 <img 
//                   src="https://readdy.ai/api/search-image?query=modern%20user%20interface%20for%20collaboration%20software%20with%20multiple%20users%20connected%2C%20dark%20theme%20with%20blue%20and%20purple%20accents%2C%20showing%20chat%20panels%20and%20shared%20workspace%2C%20professional%20UI%20design%20with%20clean%20layout&width=700&height=500&seq=demo-ui&orientation=landscape" 
//                   alt="MetaConnect Interface Demo" 
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
//                   <button className="!rounded-button whitespace-nowrap bg-blue-500/90 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center cursor-pointer">
//                     <i className="fas fa-play mr-2"></i>
//                     Watch Demo
//                   </button>
//                 </div>
//               </div>
//               <div className="bg-gray-900 p-4 flex justify-between items-center">
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
//                   <span className="text-sm text-gray-400">3 users connected</span>
//                 </div>
//                 <div className="text-sm text-gray-400">
//                   <i className="fas fa-signal mr-1"></i>
//                   25ms latency
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Demo;


import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Demo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    let animation;
    if (ref.current) {
      animation = gsap.fromTo(
        '.demo-image',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
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

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="demo" ref={ref} className="demo-section py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="w-full md:w-1/2 mb-12 md:mb-0"
          >
            <h2 className="text-4xl font-bold mb-6">See It In Action</h2>
            <p className="text-xl text-gray-400 mb-8">
              Experience the power of MetaConnect with our interactive demonstration. Connect, collaborate, and create in real-time.
            </p>
            <div className="space-y-6">
              {[
                { num: 1, title: 'Create a Space', text: 'Generate a unique room with custom settings and permissions.', color: 'blue-400' },
                { num: 2, title: 'Invite Participants', text: 'Share your room link with teammates for instant access.', color: 'purple-400' },
                { num: 3, title: 'Collaborate in Real-time', text: 'Experience seamless interaction with zero latency.', color: 'pink-400' },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start"
                >
                  <div className={`w-10 h-10 bg-${step.color}/20 rounded-full flex items-center justify-center mr-4 mt-1`}>
                    <span className={`text-${step.color} font-bold`}>{step.num}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="demo-image w-full md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <div className="bg-gray-900 p-3 border-b border-gray-700 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-sm text-gray-400">MetaConnect Demo</div>
              </div>
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=modern%20user%20interface%20for%20collaboration%20software%20with%20multiple%20users%20connected%2C%20dark%20theme%20with%20blue%20and%20purple%20accents%2C%20showing%20chat%20panels%20and%20shared%20workspace%2C%20professional%20UI%20design%20with%20clean%20layout&width=700&height=500&seq=demo-ui&orientation=landscape"
                  alt="MetaConnect Interface Demo"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-blue-500/10 flex items-center justify-center"
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="!rounded-button whitespace-nowrap bg-blue-500/90 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center cursor-pointer"
                  >
                    <i className="fas fa-play mr-2"></i>
                    Watch Demo
                  </motion.button>
                </motion.div>
              </div>
              <div className="bg-gray-900 p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-400">3 users connected</span>
                </div>
                <div className="text-sm text-gray-400">
                  <i className="fas fa-signal mr-1"></i>
                  25ms latency
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;