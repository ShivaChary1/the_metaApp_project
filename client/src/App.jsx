import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages//home/Home'
import Login from './components/pages/authentication/Login'
import Register from './components/pages/authentication/Register'
import Dashboard from './components/pages/dashboard/Dashboard'
import './App.css'
import SpaceBoard from './components/pages/spaces/SpaceBoard'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={  <Home/> } />
        <Route path='/login' element={ <Login/>}/>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/dashboard' element={ <Dashboard/>}/>
        <Route path='/dashboard/open' element={ <SpaceBoard /> } />
      </Routes>

    </BrowserRouter>
  )
}

export default App
