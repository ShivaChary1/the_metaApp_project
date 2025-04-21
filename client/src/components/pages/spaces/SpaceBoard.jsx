// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import VirtualWorkSpace from './VirtualWorkSpace';
// import axios from 'axios';

// const SpaceBoard = () => {
//   const navigate = useNavigate();
//   const isAuth = localStorage.getItem('isAuthenticated') === 'true' || false;
//   const currUser = JSON.parse(localStorage.getItem('currUser')) || null;

//   // Redirect to login if not authenticated or no currUser
//   if (!isAuth || !currUser) {
//     navigate('/login');
//     return null;
//   }

//   const baseURL = import.meta.env.VITE_BACKEND_URL;
//   const { search } = useLocation();
//   const query = new URLSearchParams(search);
//   const id = query.get('id');

//   const [space, setSpace] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSpace = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/spaces/getspace`, {
//           params: { id },
//           withCredentials: true,
//         });
//         setSpace(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching space:', err);
//         setError('Failed to load space data');
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchSpace();
//     } else {
//       setError('No space ID provided');
//       setLoading(false);
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-600">
//         Loading space...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return <VirtualWorkSpace space={space} currUser={currUser} />;
// };

// export default SpaceBoard;

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import VirtualWorkSpace from './VirtualWorkSpace';
// import axios from 'axios';

// const SpaceBoard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);
//   const [space, setSpace] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [currUser, setCurrUser] = useState(null);
//   const [isAuth, setIsAuth] = useState(false);

//   const baseURL = import.meta.env.VITE_BACKEND_URL;

//   const query = new URLSearchParams(location.search);
//   const id = query.get('id');

//   // 👇 Check Auth in useEffect
//   useEffect(() => {
//     const auth = localStorage.getItem('isAuthenticated') === 'true';
//     const user = JSON.parse(localStorage.getItem('currUser'));

//     if (!auth || !user) {
//       navigate('/login');
//     } else {
//       setCurrUser(user);
//       setIsAuth(true);
//     }

//     setIsCheckingAuth(false);
//   }, [navigate]);

//   // 👇 Fetch space data only after auth check
//   useEffect(() => {
//     if (!isCheckingAuth && id && isAuth) {
//       const fetchSpace = async () => {
//         try {
//           const response = await axios.get(`${baseURL}/spaces/getspace`, {
//             params: { id },
//             withCredentials: true,
//           });
//           setSpace(response.data);
//           setLoading(false);
//         } catch (err) {
//           console.error('Error fetching space:', err);
//           setError('Failed to load space data');
//           setLoading(false);
//         }
//       };
//       fetchSpace();
//     }
//   }, [isCheckingAuth, id, isAuth, baseURL]);

//   if (isCheckingAuth || loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-600">
//         Loading space...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return <VirtualWorkSpace space={space} currUser={currUser} />;
// };

// // export default SpaceBoard;
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import VirtualWorkspace from './VirtualWorkspace';
// import axios from 'axios';

// const SpaceBoard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isAuthChecked, setIsAuthChecked] = useState(false);
//   const [isAuth, setIsAuth] = useState(false);
//   const [currUser, setCurrUser] = useState(null);

//   const [space, setSpace] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const baseURL = import.meta.env.VITE_BACKEND_URL;
//   const query = new URLSearchParams(location.search);
//   const id = query.get('id');

//   // Step 1: Check authentication and user
//   useEffect(() => {
//     const auth = localStorage.getItem('isAuthenticated') === 'true';
//     const user = JSON.parse(localStorage.getItem('currUser'));

//     if (!auth || !user) {
//       navigate('/login');
//     } else {
//       setIsAuth(true);
//       setCurrUser(user);
//     }

//     setIsAuthChecked(true);
//   }, [navigate]);

//   // Step 2: Fetch space only if authenticated
//   useEffect(() => {
//     const fetchSpace = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/spaces/getspace`, {
//           params: { id },
//           withCredentials: true,
//         });
//         setSpace(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching space:', err);
//         setError('Failed to load space data');
//         setLoading(false);
//       }
//     };

//     if (isAuthChecked && isAuth) {
//       if (id) {
//         fetchSpace();
//       } else {
//         setError('No space ID provided');
//         setLoading(false);
//       }
//     }
//   }, [id, isAuthChecked, isAuth, baseURL]);

//   if (!isAuthChecked || loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-600">
//         Loading space...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return <VirtualWorkspace space={space} currUser={currUser} />;
// };

// export default SpaceBoard;import React, { useEffect, useState } from 'react';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VirtualWorkspace from './VirtualWorkSpace';
import axios from 'axios';

const SpaceBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const query = new URLSearchParams(location.search);
  const id = query.get('id');

  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currUser, setCurrUser] = useState(null);

  // Check authentication and redirect if not valid
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const user = JSON.parse(localStorage.getItem('currUser'));

    if (!isAuth || !user || !user.userId) {
      console.error('Authentication failed:', { isAuth, user });
      navigate('/login');
    } else {
      setCurrUser(user);
    }
  }, [navigate]);

  // Fetch space data
  useEffect(() => {
    const fetchSpace = async () => {
      if (!id) {
        setError('No space ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/spaces/getspace`, {
          params: { id },
          withCredentials: true,
        });
        console.log('Fetched space:', response.data);
        setSpace(response.data);
      } catch (err) {
        console.error('Error fetching space:', err);
        setError('Failed to load space data');
      } finally {
        setLoading(false);
      }
    };

    fetchSpace();
  }, [id, baseURL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading space...
      </div>
    );
  }

  if (error || !currUser) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error || 'Unauthorized access'}
      </div>
    );
  }

  return <VirtualWorkspace space={space} currUser={currUser} />;
};

export default SpaceBoard;
