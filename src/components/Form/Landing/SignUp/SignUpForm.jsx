import React from 'react';
import { TextInput, PasswordInput, Anchor, Paper, Title, Text, Container, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const SignUpForm = () => {
  return (
    <>
      <Container size={420} my={40}>
        <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
          Create an account!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor href="/login" size="sm">
            Sign in
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="First Name" required mt="md" />
          <TextInput label="Last Name" required mt="md" />
          <DatePicker label="Birthdate" required mt="md" />
          <TextInput label="Email" required mt="md" />
          <PasswordInput label="Password" required mt="md" />
          <PasswordInput label="Confirm Password" required mt="md" />
          <Button fullWidth mt="xl">
            Sign up
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default SignUpForm;
