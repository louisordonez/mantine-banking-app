import React, { useState } from 'react';
import { TextInput, PasswordInput, Paper, Button, Group } from '@mantine/core';
import { showNotificationToast } from '../../../../services/utilities/showNotificationToast';
import { getLocalStorageItem } from '../../../../services/utilities/localStorage';

const SignUpForm = ({ onSignUp }) => {
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

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setIsFirstNameError(false);
    setIsLastNameError(false);
    setIsEmailError(false);
    setIsPasswordError(false);
    setIsConfirmPasswordError(false);
  };

  const handlePassword = () => {
    if (password !== '') {
      if (password !== confirmPassword) {
        setIsPasswordError(true);
        setIsConfirmPasswordError(true);
        showNotificationToast('failed', 'Password and Confirm Password does not match');
      }
    } else if (password === '') {
      setIsPasswordError(true);
      showNotificationToast('failed', 'Password cannot be empty');
    } else {
      return true;
    }
  };

  const handleEmail = () => {
    const validate = /^\S+@\S+$/.test(email);
    const userListLocalStorage = getLocalStorageItem('userList');
    const findUser = userListLocalStorage.find((user) => user.email === email);

    if (validate === true) {
      if (findUser) {
        setIsEmailError(true);
        showNotificationToast('failed', 'Email already taken');
      } else {
        return true;
      }
    } else {
      setIsEmailError(true);
      showNotificationToast('failed', 'Invalid Email');
    }
  };

  const handleName = () => {
    if (firstName === '' && lastName === '') {
      setIsFirstNameError(true);
      setIsLastNameError(true);
      showNotificationToast('failed', 'First Name and Last Name cannot be empty');
    } else if (firstName === '') {
      setIsFirstNameError(true);
      showNotificationToast('failed', 'First Name cannot be empty');
    } else if (lastName === '') {
      setIsLastNameError(true);
      showNotificationToast('failed', 'Last Name cannot be empty');
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    const checkValidation = () => {
      return handleName() || handleEmail() || handlePassword() ? true : false;
    };

    if (checkValidation()) {
      onSignUp({
        accountNumber: Date.parse(new Date()),
        firstName,
        lastName,
        email,
        password,
        balance: parseFloat(0.0),
        role: 'user',
      });
      resetForm();
      showNotificationToast('success', 'You may now sign in with your email and password');
    }
  };

  return (
    <>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Group grow>
          <TextInput
            label="First Name"
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            error={isFirstNameError}
          />
          <TextInput
            label="Last Name"
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            error={isLastNameError}
          />
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
        <Button fullWidth mt="xl" color="green" onClick={handleSubmit}>
          Sign up
        </Button>
      </Paper>
    </>
  );
};

export default SignUpForm;
