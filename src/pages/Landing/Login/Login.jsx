import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Title, Text, Container, Group, Center } from '@mantine/core';
import { BuildingBank } from 'tabler-icons-react';
import LoginForm from '../../../components/Form/Landing/Login/LoginForm';
import { assignLocalStorageItem, getLocalStorageItem } from '../../../services/utilities/localStorage';
import { showNotificationToast } from '../../../services/utilities/showNotificationToast';

const Login = () => {
  const [isError, setIsError] = useState(false);

  const handleLogin = (loginData) => {
    const userDataLocalStorage = getLocalStorageItem('userList');
    const findUser = userDataLocalStorage.find(
      (user) => user.email === loginData.email && user.password === loginData.password
    );

    if (findUser === undefined) {
      setIsError(true);
      showNotificationToast('failed', 'Check your email and password');
    } else {
      setIsError(false);
      assignLocalStorageItem('userData', {
        accountNumber: findUser.accountNumber,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email: findUser.email,
        role: findUser.role,
        isLoggedIn: true,
      });

      window.location.assign('/dashboard');
    }
  };

  return (
    <>
      <Container size={420} my={40}>
        <Center>
          <Group
            spacing={6}
            className="cursor-pointer"
            style={{
              marginBottom: '1rem',
              textDecoration: 'none',
              color: 'black',
            }}
            component={Link}
            to="/"
          >
            <BuildingBank size={56} />
          </Group>
        </Center>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor href="/signup" size="sm">
            Create account
          </Anchor>
        </Text>
        <LoginForm isError={isError} onLogin={handleLogin} />
      </Container>
    </>
  );
};

export default Login;
