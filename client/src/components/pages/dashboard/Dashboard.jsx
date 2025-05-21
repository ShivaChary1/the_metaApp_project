// import React, { useState, useEffect } from 'react';
// import DashboardHeader from './DashboardHeader';
// import MySpaces from './MySpaces';
// import JoinedSpaces from './JoinedSpaces';
// import ProfileModal from './ProfileModal';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Dashboard = () => {
//   const baseURL = import.meta.env.VITE_BACKEND_URL;;  
//   const navigate = useNavigate();
//   const [allSpaces, setAllSpaces] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [error, setError] = useState(null);

//   const currUser = JSON.parse(localStorage.getItem('currUser'));
//   console.log(currUser);
  

//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }

//     const fetchSpaces = async () => {
//       try {
//         const spacesResponse = await axios.get(`${baseURL}/spaces/allspaces`, { params:{ userId : currUser.userId} });
//         console.log(spacesResponse.data);
//         setAllSpaces(spacesResponse.data);
//       } catch (err) {
//         setError('Failed to fetch spaces. Please try again later.');
//         console.log('Error fetching spaces:', err);
//       }
//     };

//     fetchSpaces();
//   }, [isModalOpen,navigate,currUser.userId]);

//   const filteredSpaces = allSpaces.filter((space) =>
//     space.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const filteredMySpaces = filteredSpaces.filter((space) => space.type === 'my');
//   const filteredJoinedSpaces = filteredSpaces.filter((space) => space.type === 'joined');

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
//       <DashboardHeader setModalOpen={setModalOpen} />
//       <main className="container mx-auto px-6 py-8">
//         {error && (
//           <div className="mb-4 text-red-500 text-center">
//             {error}
//           </div>
//         )}
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
//         <MySpaces spaces={filteredMySpaces} currUser={currUser} />
//         <JoinedSpaces spaces={filteredJoinedSpaces} />
//       </main>
//       <ProfileModal isOpen={isModalOpen} setIsOpen={setModalOpen} currUser={currUser} />
//     </div>
//   );

// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import DashboardHeader from './DashboardHeader';
// import MySpaces from './MySpaces';
// import JoinedSpaces from './JoinedSpaces';
// import ProfileModal from './ProfileModal';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Dashboard = () => {
//   const baseURL = import.meta.env.VITE_BACKEND_URL;
//   const navigate = useNavigate();
//   const [allSpaces, setAllSpaces] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const currUser = JSON.parse(localStorage.getItem('currUser'));

//   const fetchSpaces = async (retries = 3) => {
//     if (!currUser?.userId) {
//       setError('User not authenticated. Please log in.');
//       navigate('/login');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${baseURL}/spaces/allspaces`, {
//         params: { userId: currUser.userId },
//         withCredentials: true,
//       });
//       setAllSpaces(response.data);
//       setError(null);
//     } catch (err) {
//       if (retries > 0) {
//         console.log(`Retrying... (${retries} attempts left)`);
//         setTimeout(() => fetchSpaces(retries - 1), 2000);
//       } else {
//         setError('Failed to fetch spaces. Please try again later.');
//         console.error('Error fetching spaces:', err);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//     if (!isAuthenticated || !currUser) {
//       navigate('/login');
//       return;
//     }

//     fetchSpaces();

//     // Polling every 30 seconds
//     const intervalId = setInterval(fetchSpaces, 30000);

//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, [navigate, currUser?.userId]);

//   const filteredSpaces = allSpaces.filter((space) =>
//     space.title?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const filteredMySpaces = filteredSpaces.filter((space) => space.type === 'my');
//   const filteredJoinedSpaces = filteredSpaces.filter((space) => space.type === 'joined');

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
//       <DashboardHeader setModalOpen={setModalOpen} />
//       <main className="container mx-auto px-6 py-8">
//         {error && (
//           <div className="mb-4 text-red-500 text-center" role="alert">
//             {error}
//           </div>
//         )}
//         {isLoading && (
//           <div className="text-center mb-4">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//             <span className="ml-2">Loading spaces...</span>
//           </div>
//         )}
//         <div className="mb-8">
//           <div className="relative max-w-md mx-auto">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-gray-700 border-none text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//               placeholder="Search spaces..."
//               aria-label="Search spaces"
//             />
//             <div className="absolute inset-y-0 right-4 flex items-center text-gray-400">
//               <i className="fas fa-search" aria-hidden="true"></i>
//             </div>
//           </div>
//         </div>
//         <MySpaces spaces={filteredMySpaces} currUser={currUser} />
//         <JoinedSpaces spaces={filteredJoinedSpaces} />
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
import {jwtDecode} from 'jwt-decode'
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [allSpaces, setAllSpaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const currUser = JSON.parse(localStorage.getItem('currUser'));
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // current time in seconds

        if (decoded.exp < currentTime) {
          handleLogout();
        } else {
          // Optional: auto logout when token expires
          const timeUntilExpiry = (decoded.exp * 1000) - Date.now();
          setTimeout(() => {
            handleLogout();
          }, timeUntilExpiry);
        }
      } catch (err) {
        console.error('Invalid token',err);
        handleLogout();
      }
    }


    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('spaceId');
    navigate('/login')// if you prefer
    };


  },[])

  const fetchSpaces = async (retries = 3) => {
    if (!currUser?.userId) {
      setError('User not authenticated. Please log in.');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/spaces/allspaces`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        }
      });
      setAllSpaces(response.data);
      setError(null);
    } catch (err) {
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        setTimeout(() => fetchSpaces(retries - 1), 2000);
      } else {
        setError('Failed to fetch spaces. Please try again later.');
        console.error('Error fetching spaces:', err);
      }
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !currUser) {
      navigate('/login');
      return;
    }

    fetchSpaces();
  }, []);

  const filteredSpaces = allSpaces.filter((space) =>
    space.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMySpaces = filteredSpaces.filter((space) => space.type === 'my');
  const filteredJoinedSpaces = filteredSpaces.filter((space) => space.type === 'joined');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <DashboardHeader setModalOpen={setModalOpen} />
      <main className="container mx-auto px-6 py-8">
        {error && (
          <div className="mb-4 text-red-500 text-center" role="alert">
            {error}
          </div>
        )}
        {isLoading && !hasLoaded && (
          <div className="text-center mb-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-2">Loading spaces...</span>
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
              aria-label="Search spaces"
            />
            <div className="absolute inset-y-0 right-4 flex items-center text-gray-400">
              <i className="fas fa-search" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <MySpaces spaces={filteredMySpaces} currUser={currUser} onSpaceCreated={fetchSpaces} />
        <JoinedSpaces spaces={filteredJoinedSpaces} onSpaceJoined={fetchSpaces} />
      </main>
      <ProfileModal isOpen={isModalOpen} setIsOpen={setModalOpen} currUser={currUser} />
    </div>
  );
};

export default Dashboard;