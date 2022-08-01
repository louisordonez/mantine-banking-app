import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Landing/Home/Home';
import Login from './pages/Landing/Login/Login';
import SignUp from './pages/Landing/SignUp/SignUp';
import Client from './pages/Client/Client';
import Error404 from './pages/Error/Error404/Error404';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route index path="client/:client" element={<Client />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
