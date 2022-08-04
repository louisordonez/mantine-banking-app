import React, { useState } from 'react';
import { TextInput, PasswordInput, Paper, Button, Group } from '@mantine/core';
import { showNotificationToast } from '../../../../services/utilities/showNotificationToast';
import { checkPassword, checkEmail, checkName } from '../../../../services/utilities/userDataValidation';

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
    const error = checkPassword(password, confirmPassword);

    if (error === 'password') {
      setIsPasswordError(true);
    } else if (error === 'passwordConfirmPassword') {
      setIsPasswordError(true);
      setIsConfirmPasswordError(true);
    }
  };

  const handleEmail = () => {
    const error = checkEmail(email);
    return error === 'email' ? setIsEmailError(true) : true;
  };

  const handleName = () => {
    const error = checkName(firstName, lastName);

    if (error === 'fullName') {
      setIsFirstNameError(true);
      setIsLastNameError(true);
    } else if (error === 'firstName') {
      setIsFirstNameError(true);
    } else if (error === 'lastName') {
      setIsLastNameError(true);
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    const checkValidation = () => {
      handleName();
      handleEmail();
      handlePassword();
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
