import React, { useState } from 'react';
import { TextInput, PasswordInput, Paper, Button, Group } from '@mantine/core';
import { showNotificationToast } from '../../../../services/utilities/showNotificationToast';
import { checkPassword, checkEmail } from '../../../../services/utilities/userDataValidation';

const SignUpForm = ({ onSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

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
    const valid = checkEmail(email);

    if (valid) {
      setIsEmailError(false);
      return true;
    } else {
      setIsEmailError(true);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkValidation = () => {
      return handleEmail() && handlePassword() ? true : false;
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
      <form onSubmit={handleSubmit}>
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
            Sign up
          </Button>
        </Paper>
      </form>
    </>
  );
};

export default SignUpForm;
