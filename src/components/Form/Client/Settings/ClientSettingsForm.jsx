import React from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Group,
} from '@mantine/core';

const ClientSettingsForm = () => {
  return (
    <>
      <Title>Settings</Title>
      <Container size={480} my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Group grow>
            <TextInput label="First Name" required />
            <TextInput label="Last Name" required />
          </Group>
          <TextInput label="Email" required mt="md" />
          <Group grow>
            <PasswordInput label="Password" required mt="md" />
            <PasswordInput label="Confirm Password" required mt="md" />
          </Group>
          <Button fullWidth mt="xl" color="green">
            Save
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default ClientSettingsForm;
