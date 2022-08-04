import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Title, Text, Container, Group, Center } from '@mantine/core';
import { BuildingBank } from 'tabler-icons-react';
import SignUpForm from '../../../components/Form/Landing/SignUp/SignUpForm';
import { assignLocalStorageItem, getLocalStorageItem } from '../../../services/utilities/localStorage';
import { useRedirect } from '../../../services/utilities/useRedirect';

const SignUp = () => {
  useRedirect();

  const handleSignUp = (signUpInfo) => {
    const userListLocalStorage = getLocalStorageItem('userList');

    assignLocalStorageItem('userList', [...userListLocalStorage, signUpInfo]);
  };

  return (
    <>
      <Container size={480} my={40}>
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
          Create account
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor href="/login" size="sm">
            Sign in
          </Anchor>
        </Text>
        <SignUpForm onSignUp={handleSignUp} />
      </Container>
    </>
  );
};

export default SignUp;
