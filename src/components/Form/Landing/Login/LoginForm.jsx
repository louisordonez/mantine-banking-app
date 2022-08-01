import React from 'react';
import { TextInput, PasswordInput, Anchor, Paper, Title, Text, Container, Button } from '@mantine/core';

const LoginForm = () => {
  return (
    <>
      <Container size={420} my={40}>
        <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
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
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default LoginForm;
