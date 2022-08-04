import React, { useState } from 'react';
import { TextInput, PasswordInput, Paper, Container, Button, Group } from '@mantine/core';
import { showNotificationToast } from '../../../../services/utilities/showNotificationToast';
import { getLocalStorageItem, assignLocalStorageItem } from '../../../../services/utilities/localStorage';

const ClientSettingsForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const [isLastNameError, setIsLastNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);

  return (
    <>
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
