import React from 'react';
import { TextInput, PasswordInput, Anchor, Paper, Title, Text, Container, Button, Group, Center } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { BuildingBank } from 'tabler-icons-react';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  return (
    <>
      <Container size={420} my={40}>
        <Center>
          <Group
            spacing={6}
            className="cursor-pointer"
            style={{ marginBottom: '1rem', textDecoration: 'none', color: 'black' }}
            component={Link}
            to="/"
          >
            <BuildingBank size={56} />
          </Group>
        </Center>
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
          <TextInput label="First Name" required />
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
