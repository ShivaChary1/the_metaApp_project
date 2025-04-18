import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages//home/Home'
import Login from './components/pages/autentication/Login'
import Register from './components/pages/autentication/Register'
import Dashboard from './components/pages/dashboard/Dashboard'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={  <Home/> } />
        <Route path='/login' element={ <Login/>}/>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/dashboard' element={ <Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
