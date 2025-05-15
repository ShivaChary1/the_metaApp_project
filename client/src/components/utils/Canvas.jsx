// import React, { useRef, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';
// import axios from 'axios';

// const Canvas = () => {
//   const baseURL = import.meta.env.VITE_BACKEND_URL
//   const canvasRef = useRef(null);
//   const [position, setPosition] = useState({ x: 100, y: 100 });
//   const [users, setUsers] = useState([]);
//   const size = 30;
//   const speed = 5;
//   const {spaceId} = useParams(); // This should come from the user's selected virtual space
//   const socket = useRef(null);

//   useEffect(() => {
//     // Establish socket connection
//     socket.current = io(baseURL); // Ensure to replace with your server's URL

//     // Listen for updated users data from the server
//     socket.current.on('updateUsers', (updatedUsers) => {
//       setUsers(updatedUsers);
//     });

//     // Emit user join when the component mounts
//     socket.current.emit('join', { userId: 'uniqueUserId', spaceId, x: position.x, y: position.y });

//     // Cleanup function to disconnect the socket when the component is unmounted
//     return () => {
//       socket.current.disconnect();
//     };
//   }, [spaceId, position.x, position.y]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     function drawCanvas() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw own avatar (blue)
//       ctx.fillStyle = 'blue';
//       ctx.beginPath();
//       ctx.arc(position.x, position.y, size, 0, Math.PI * 2);
//       ctx.fill();

//       // Draw other users (green)
//       users.forEach(user => {
//         ctx.fillStyle = 'green';
//         ctx.beginPath();
//         ctx.arc(user.position.x, user.position.y, size, 0, Math.PI * 2);
//         ctx.fill();
//       });
//     }

//     drawCanvas();
//   }, [position, users]); // Re-render canvas when position or users change

//   // Handle keyboard movement
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       setPosition(prev => {
//         let newX = prev.x;
//         let newY = prev.y;

//         if (event.key === 'ArrowUp' || event.key === 'w') newY -= speed;
//         if (event.key === 'ArrowDown' || event.key === 's') newY += speed;
//         if (event.key === 'ArrowLeft' || event.key === 'a') newX -= speed;
//         if (event.key === 'ArrowRight' || event.key === 'd') newX += speed;

//         socket.current.emit('move', { spaceId, x: newX, y: newY }); // Emit the position to backend for specific virtual space
//         return { x: newX, y: newY };
//       });
//     };

//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [spaceId]);

//   useEffect(() => {
//     const fetchData = async () =>{
//       const response = await axios.get(`${baseURL}/spaces/getspace`, {
//         params:{
//           id: spaceId
//         }
//       })
//       const data = response.data.currentUsers;
//       setUsers(data);
//     }
//     fetchData();
//   },[users]);



//   return (
//     <div style={{ textAlign: 'center', marginTop: '20px' }}>
//       <canvas
//         ref={canvasRef}
//         width={600}
//         height={400}
//         style={{ border: '2px solid black', backgroundColor: '#eee' }}
//       />
//     </div>
//   );
// };

// export default Canvas;


import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getSocket, isSocketConnected } from './socket';
import axios from 'axios';

const Canvas = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = React.useState([]);
  const [position, setPosition] = useState({});
  const { spaceId } = useParams();
  const [socket,setSocket] = useState(null); 

  // Fetch users' data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/spaces/getspace`, {
          params: { id: spaceId },
          headers
          : {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data.currentUsers);
        setPosition(response.data.currentUsers[0].position);
        console.log('Fetched users:', response.data.currentUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    setTimeout(()=>{
      if(getSocket()){
        setSocket(getSocket());
      }
    },1000)

    
    fetchData();
  }, [spaceId]);

  useEffect(() => {
      if (socket && position?.x != null && position?.y != null) {
        socket.emit("positionUpdate", position);
      }
  }, [position, socket]);


  
  
  const updatePosition = () => {
    setPosition({
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 500),
    })
  }

  if(!socket) return <div>Loading...</div>

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {users.map((user, index) =>{
        return (
          <div key={index}> 
            {user.user.fullName}

            <div>
              <button onClick={updatePosition}>
                click to update positions
              </button>
            </div>
            {position.x} {position.y}
          </div>

        )
      } )}
    </div>
  );
};

export default Canvas;
