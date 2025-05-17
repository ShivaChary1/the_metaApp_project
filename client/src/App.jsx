import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages//home/Home'
import Login from './components/pages/authentication/Login'
import Register from './components/pages/authentication/Register'
import Dashboard from './components/pages/dashboard/Dashboard'
import './App.css'
import Spaceboard from './components/pages/spaces/SpaceBoard'
import Canvas from './components/utils/Canvas'
import { getSocket,connectSocket } from './components/utils/socket'
import ProtectedRoute from './components/utils/ProtectedRoute'


const App = () => {
  let socket;

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const spaceId = localStorage.getItem('spaceId'); 
    if (token && spaceId) {
      connectSocket();
      socket = getSocket();
      socket.emit('enteredSpace', { spaceId });
    }
  },[])



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={  <Home/> } />
        <Route path='/login' element={ <Login/>}/>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
        <Route path='/dashboard/open/:spaceId' element={  <Spaceboard/> } />
        {/* <Route path='/open' element={  }/> */}
      </Routes>

    </BrowserRouter>
  )
}

export default App
