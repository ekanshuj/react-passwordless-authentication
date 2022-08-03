import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Authenticate from './pages/Authenticate';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </div>
  )
}

export default App