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

  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);

  const resetForm = () => {
    setIsEmailError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
  };

  const handlePassword = () => {
    const valid = checkPassword(password, confirmPassword);

    if (valid) {
      setIsPasswordError(false);
      setIsConfirmPasswordError(false);
      return true;
    } else {
      setIsPasswordError(true);
      setIsConfirmPasswordError(true);
      return false;
    }
  };

  const handleEmail = () => {
    const validate = /^\S+@\S+$/.test(email);
    const findEmail = userListLocalStorage.find((user) => user.email === email);

    if (validate) {
      if (findEmail.accountNumber !== userDataLocalStorage.accountNumber) {
        setIsEmailError(true);
        showNotificationToast('failed', 'Email already taken');
        return false;
      } else {
        return true;
      }
    } else {
      setIsEmailError(true);
      showNotificationToast('failed', 'Invalid Email');
      return false;
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
      resetForm();
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
            <TextInput
              label="Email"
              required
              mt="md"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              error={isEmailError}
            />
            <Group grow>
              <PasswordInput
                label="Password"
                required
                mt="md"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                error={isPasswordError}
              />
              <PasswordInput
                label="Confirm Password"
                required
                mt="md"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                error={isConfirmPasswordError}
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
