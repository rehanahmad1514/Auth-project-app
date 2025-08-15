import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {

  return (
    <div className="flex justify-center items-center w-screen h-screen ">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/signup' element = {<Signup />} />
          <Route path='/home'  element = {<Home/>} />
        </Routes>
    </div>

  )
}

export default App
