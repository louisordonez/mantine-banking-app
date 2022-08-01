import React from 'react';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Group,
  Center,
} from '@mantine/core';
import { BuildingBank } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
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
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" required />
          <PasswordInput label="Password" required mt="md" />
          <Button fullWidth mt="xl" color="green">
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default LoginForm;
