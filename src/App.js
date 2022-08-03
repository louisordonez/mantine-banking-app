import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Landing/Home/Home';
import Login from './pages/Landing/Login/Login';
import SignUp from './pages/Landing/SignUp/SignUp';
import Client from './pages/Client/Client';
import Error404 from './pages/Error/Error404/Error404';
import { assignLocalStorageItem, getLocalStorageItem } from './services/utilities/localStorage';
import { USER_LIST } from './services/constants/userList';

function App() {
  useEffect(() => {
    const userListLocalStorage = getLocalStorageItem('userList');

    if (userListLocalStorage === null) {
      assignLocalStorageItem('userList', USER_LIST);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path=":client" element={<Client />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
