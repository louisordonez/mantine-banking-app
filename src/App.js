import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Landing/Home/Home';
import Login from './pages/Landing/Login/Login';
import SignUp from './pages/Landing/SignUp/SignUp';
import Client from './pages/Client/Client';
import Error404 from './pages/Error/Error404/Error404';
import ProtectedRoute from './routes/ProtectedRoute';
import { assignLocalStorageItem, getLocalStorageItem } from './services/utilities/localStorage';
import { USER_LIST } from './services/constants/userList';

function App() {
  useEffect(() => {
    const userListLocalStorage = getLocalStorageItem('userList');
    const expenseListLocalStorage = getLocalStorageItem('expenseList');
    const transactionListLocalStorage = getLocalStorageItem('transactionList');

    if (userListLocalStorage === null) {
      assignLocalStorageItem('userList', USER_LIST);
    }

    if (expenseListLocalStorage === null) {
      assignLocalStorageItem('expenseList', [{}]);
    }

    if (transactionListLocalStorage === null) {
      assignLocalStorageItem('transactionList', [{}]);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path=":client" element={<Client />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
