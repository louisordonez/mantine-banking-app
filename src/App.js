import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Landing/Home/Home';
import Login from './pages/Landing/Login/Login';
import SignUp from './pages/Landing/SignUp/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
