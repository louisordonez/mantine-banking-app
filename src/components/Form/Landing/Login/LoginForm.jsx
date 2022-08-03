import React, { useState } from 'react';
import { TextInput, PasswordInput, Paper, Button } from '@mantine/core';

const LoginForm = ({ isError, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = () => {
    onLogin({
      email,
      password,
    });
    resetForm();
  };

  return (
    <>
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        <TextInput label="Email" required onChange={(e) => setEmail(e.target.value)} value={email} error={isError} />
        <PasswordInput
          label="Password"
          required
          mt="md"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={isError}
        />
        <Button fullWidth mt="xl" color="green" onClick={handleSubmit}>
          Sign in
        </Button>
      </Paper>
    </>
  );
};

export default LoginForm;
