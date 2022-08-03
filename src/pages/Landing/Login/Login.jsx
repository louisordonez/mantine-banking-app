import React from 'react';
import LoginForm from '../../../components/Form/Landing/Login/LoginForm';
import { assignLocalStorageItem, getLocalStorageItem } from '../../../services/utilities/localStorage';

const Login = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
