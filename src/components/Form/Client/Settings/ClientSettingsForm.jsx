import React, { useState } from 'react';
import { TextInput, PasswordInput, Paper, Container, Button, Group } from '@mantine/core';
import { showNotificationToast } from '../../../../services/utilities/showNotificationToast';
import { checkPassword } from '../../../../services/utilities/userDataValidation';
import { getLocalStorageItem } from '../../../../services/utilities/localStorage';

const ClientSettingsForm = ({ onSettings }) => {
  const userDataLocalStorage = getLocalStorageItem('userData')[0];
  const userListLocalStorage = getLocalStorageItem('userList');
  const findUser = userListLocalStorage.find((user) => user.accountNumber === userDataLocalStorage.accountNumber);

  const [firstName, setFirstName] = useState(userDataLocalStorage.firstName);
  const [lastName, setLastName] = useState(userDataLocalStorage.lastName);
  const [email, setEmail] = useState(userDataLocalStorage.email);
  const [password, setPassword] = useState(findUser.password);
  const [confirmPassword, setConfirmPassword] = useState(findUser.password);

  const handlePassword = () => {
    return checkPassword(password, confirmPassword);
  };

  const handleEmail = () => {
    const validate = /^\S+@\S+$/.test(email);
    const findEmail = userListLocalStorage.find((user) => user.email === email);

    if (!validate) {
      showNotificationToast('failed', 'Invalid Email');
      return false;
    } else {
      if (findEmail === undefined) {
        return true;
      } else if (findEmail.email === userDataLocalStorage.email) {
        showNotificationToast('failed', 'Email already taken');
        return false;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkValidation = () => {
      return handleEmail() && handlePassword() ? true : false;
    };

    if (checkValidation()) {
      onSettings({
        accountNumber: userDataLocalStorage.accountNumber,
        firstName,
        lastName,
        email,
        password,
      });
      showNotificationToast('success', 'Changes saved');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container size={480} my={40}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Group grow>
              <TextInput label="First Name" required onChange={(e) => setFirstName(e.target.value)} value={firstName} />
              <TextInput label="Last Name" required onChange={(e) => setLastName(e.target.value)} value={lastName} />
            </Group>
            <TextInput label="Email" required mt="md" onChange={(e) => setEmail(e.target.value)} value={email} />
            <Group grow>
              <PasswordInput
                label="Password"
                required
                mt="md"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <PasswordInput
                label="Confirm Password"
                required
                mt="md"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </Group>
            <Button fullWidth mt="xl" color="green" type="submit">
              Confirm
            </Button>
          </Paper>
        </Container>
      </form>
    </>
  );
};

export default ClientSettingsForm;
