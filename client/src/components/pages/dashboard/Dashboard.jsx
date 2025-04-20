// import React, { useState, useEffect } from 'react';
// import DashboardHeader from './DashboardHeader';
// import MySpaces from './MySpaces';
// import JoinedSpaces from './JoinedSpaces';
// import ProfileModal from './ProfileModal';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
// const navigate = useNavigate();

// useEffect(() => {
//   const isAuthenticated = localStorage.getItem("isAuthenticated") === "true" || false;
//   if (!isAuthenticated) {
//     navigate("/login");
//   }
// }, []);

  
//   const currUser = JSON.parse(localStorage.getItem("currUser"));
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setModalOpen] = useState(false);

//   const allSpaces = [
//     {
//       type: 'my',
//       title: 'Product Team',
//       createdOrJoined: 'Created 2 days ago',
//       participants: 8,
//       lastActive: '2 hours ago',
//       iconClass: 'fa-project-diagram',
//       iconColor: 'text-blue-400',
//       avatars: [
//         { initials: 'JD', bgColor: 'bg-purple-500', textColor: 'text-purple-400' },
//         { initials: 'AM', bgColor: 'bg-blue-500', textColor: 'text-blue-400' },
//         { initials: '+6', bgColor: 'bg-green-500', textColor: 'text-green-400' },
//       ],
//     },
//     {
//       type: 'my',
//       title: 'Dev Sync',
//       createdOrJoined: 'Created 5 days ago',
//       participants: 5,
//       lastActive: '30 minutes ago',
//       iconClass: 'fa-code',
//       iconColor: 'text-purple-400',
//       avatars: [
//         { initials: 'RK', bgColor: 'bg-red-500', textColor: 'text-red-400' },
//         { initials: 'SL', bgColor: 'bg-yellow-500', textColor: 'text-yellow-400' },
//         { initials: '+3', bgColor: 'bg-pink-500', textColor: 'text-pink-400' },
//       ],
//     },
//     {
//       type: 'joined',
//       title: 'Marketing Campaign',
//       createdOrJoined: 'Joined 1 week ago',
//       participants: 12,
//       lastActive: '1 hour ago',
//       iconClass: 'fa-briefcase',
//       iconColor: 'text-green-400',
//       avatars: [
//         { initials: 'TM', bgColor: 'bg-cyan-500', textColor: 'text-cyan-400' },
//         { initials: 'KL', bgColor: 'bg-orange-500', textColor: 'text-orange-400' },
//         { initials: '+9', bgColor: 'bg-indigo-500', textColor: 'text-indigo-400' },
//       ],
//     },
//   ];

//   const filteredSpaces = allSpaces.filter((space) =>
//     space.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );


//   const mySpaces = filteredSpaces.filter((space) => space.type === 'my');

//   const joinedSpaces = filteredSpaces.filter((space) => space.type === 'joined');

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
//       <DashboardHeader setModalOpen={setModalOpen} />
//       <main className="container mx-auto px-6 py-8">
//         <div className="mb-8">
//           <div className="relative max-w-md mx-auto">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//               placeholder="Search spaces..."
//             />
//             <div className="absolute inset-y-0 right-4 flex items-center text-gray-400">
//               <i className="fas fa-search"></i>
//             </div>
//           </div>
//         </div>
//         <MySpaces spaces={mySpaces} currUser={currUser} />
//         <JoinedSpaces spaces={joinedSpaces} />
//       </main>
//       <ProfileModal isOpen={isModalOpen} setIsOpen={setModalOpen} currUser={currUser} />
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import MySpaces from './MySpaces';
import JoinedSpaces from './JoinedSpaces';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [allSpaces, setAllSpaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const currUser = JSON.parse(localStorage.getItem('currUser'));
  console.log(currUser);
  

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchSpaces = async () => {
      try {
        const spacesResponse = await axios.get('http://192.168.1.109:5000/spaces/allspaces', { params:{ userId : currUser.userId} });
        console.log(spacesResponse.data);
        setAllSpaces(spacesResponse.data);
      } catch (err) {
        setError('Failed to fetch spaces. Please try again later.');
        console.log('Error fetching spaces:', err);
      }
    };

    fetchSpaces();
  }, [isModalOpen,navigate,currUser.userId]);

  const filteredSpaces = allSpaces.filter((space) =>
    space.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMySpaces = filteredSpaces.filter((space) => space.type === 'my');
  const filteredJoinedSpaces = filteredSpaces.filter((space) => space.type === 'joined');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <DashboardHeader setModalOpen={setModalOpen} />
      <main className="container mx-auto px-6 py-8">
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              placeholder="Search spaces..."
            />
            <div className="absolute inset-y-0 right-4 flex items-center text-gray-400">
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>
        <MySpaces spaces={filteredMySpaces} currUser={currUser} />
        <JoinedSpaces spaces={filteredJoinedSpaces} />
      </main>
      <ProfileModal isOpen={isModalOpen} setIsOpen={setModalOpen} currUser={currUser} />
    </div>
  );

};

export default Dashboard;