// import React from 'react';

// const Tech = () => {
//   return (
//     <section id="tech" className="py-20 bg-gray-900">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4">Technology Stack</h2>
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//             Built with modern, powerful technologies to ensure reliability, performance, and scalability.
//           </p>
//         </div>
        
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
//             <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
//               <i className="fab fa-react text-3xl text-blue-400"></i>
//             </div>
//             <h3 className="text-xl font-bold mb-2">React</h3>
//             <p className="text-gray-400 text-sm">
//               Frontend UI library for building interactive components
//             </p>
//           </div>
          
//           <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
//             <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
//               <i className="fab fa-node-js text-3xl text-green-400"></i>
//             </div>
//             <h3 className="text-xl font-bold mb-2">Node.js</h3>
//             <p className="text-gray-400 text-sm">
//               Server-side JavaScript runtime environment
//             </p>
//           </div>
          
//           <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
//             <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
//               <i className="fas fa-plug text-3xl text-yellow-400"></i>
//             </div>
//             <h3 className="text-xl font-bold mb-2">Socket.io</h3>
//             <p className="text-gray-400 text-sm">
//               Real-time bidirectional event-based communication
//             </p>
//           </div>
          
//           <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
//             <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
//               <i className="fas fa-video text-3xl text-purple-400"></i>
//             </div>
//             <h3 className="text-xl font-bold mb-2">WebRTC</h3>
//             <p className="text-gray-400 text-sm">
//               Peer-to-peer communication for audio, video, and data
//             </p>
//           </div>
          
//           <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
//             <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
//               <i className="fas fa-database text-3xl text-red-400"></i>
//             </div>
//             <h3 className="text-xl font-bold mb-2">MongoDB</h3>
//             <p className="text-gray-400 text-sm">
//               NoSQL database for storing user and room data
//             </p>
//           </div>
          
//           <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
//             <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-4">
//               <i className="fas fa-lock text-3xl text-pink-400"></i>
//             </div>
//             <h3 className="text-xl font-bold mb-2">JWT</h3>
//             <p className="text-gray-400 text-sm">
//               Secure authentication and authorization
//             </p>
//           </div>
          
//           <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
//             <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
//               <i className="fab fa-docker text-3xl text-cyan-400"></i>
//             </div>
//             <h3 className="text-xl font-bold mb-2">Docker</h3>
//             <p className="text-gray-400 text-sm">
//               Containerization for consistent deployment
//             </p>
//           </div>
          
//           <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/80 cursor-pointer">
//             <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
//               <i className="fas fa-cloud text-3xl text-orange-400"></i>
//             </div>
//             <h3 className="text-xl font-bold mb-2">AWS</h3>
//             <p className="text-gray-400 text-sm">
//               Cloud infrastructure for scalable deployment
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Tech;


import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Tech = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    let animations = [];
    if (ref.current) {
      const cards = ref.current.querySelectorAll('.tech-card');
      cards.forEach((card, i) => {
        const animation = gsap.fromTo(
          card,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        );
        animations.push(animation);
      });
    }

    return () => {
      animations.forEach((animation) => animation.kill());
      if (ref.current) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger && trigger.trigger.parentElement === ref.current) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  return (
    <section id="tech" ref={ref} className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Technology Stack</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built with modern, powerful technologies to ensure reliability, performance, and scalability.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: 'fab fa-react', title: 'React', text: 'Frontend UI library for building interactive components', color: 'blue-400' },
            { icon: 'fab fa-node-js', title: 'Node.js', text: 'Server-side JavaScript runtime environment', color: 'green-400' },
            { icon: 'fa-plug', title: 'Socket.io', text: 'Real-time bidirectional event-based communication', color: 'yellow-400' },
            { icon: 'fa-video', title: 'WebRTC', text: 'Peer-to-peer communication for audio, video, and data', color: 'purple-400' },
            { icon: 'fa-database', title: 'MongoDB', text: 'NoSQL database for storing user and room data', color: 'red-400' },
            { icon: 'fa-lock', title: 'JWT', text: 'Secure authentication and authorization', color: 'pink-400' },
            { icon: 'fab fa-docker', title: 'Docker', text: 'Containerization for consistent deployment', color: 'cyan-400' },
            { icon: 'fa-cloud', title: 'AWS', text: 'Cloud infrastructure for scalable deployment', color: 'orange-400' },
          ].map((tech, i) => (
            <motion.div
              key={i}
              className="tech-card bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center"
              whileHover={{ scale: 1.03 }}
            >
              <div className={`w-16 h-16 bg-${tech.color}/20 rounded-full flex items-center justify-center mb-4`}>
                <i className={`fas ${tech.icon} text-3xl text-${tech.color}`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
              <p className="text-gray-400 text-sm">{tech.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tech;