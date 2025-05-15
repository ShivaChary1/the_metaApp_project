import React from 'react';
import axios from 'axios';
import { disconnectSocket } from '../../utils/socket';
const DashboardHeader = ({ setModalOpen }) => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;;  
  const logout = async ()=>{
    try {
      await axios.get(`${baseURL}/users/logout`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      localStorage.removeItem('token'); // Remove user ID from local storage
      localStorage.removeItem('currUser'); // Remove user ID from local storage
      disconnectSocket();
      window.location.href = '/login'; // Redirect to login page after logout
    } catch (err) {
      console.error('Logout error:', err);
    }
  }
  return (
    <header className="bg-gray-900/90 backdrop-blur-md py-4 border-b border-gray-800">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Dashboard</h1>

        <div className='flex items-center space-x-4 justify-center'>
          <button
            onClick={() => setModalOpen(true)}
            className="text-gray-400 cursor-pointer hover:text-white transition-all duration-300"
            title="Profile"
            >
            <i className="fas fa-user-circle text-2xl"></i>
          </button>

          
          <button onClick={logout} className='cursor-pointer text-md text-gray-400 hover:text-white transition-all duration-300'>
            logout <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;