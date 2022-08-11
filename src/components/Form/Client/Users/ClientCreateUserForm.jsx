import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Group } from '@mantine/core';
import { showNotificationToast } from '../../../../services/utilities/showNotificationToast';
import { checkPassword } from '../../../../services/utilities/userDataValidation';
import { getLocalStorageItem } from '../../../../services/utilities/localStorage';

const ClientCreateUserForm = ({ onModal, onCreateUser }) => {
  const userDataLocalStorage = getLocalStorageItem('userData')[0];
  const userListLocalStorage = getLocalStorageItem('userList');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [balance, setBalance] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      onCreateUser({
        accountNumber: Date.parse(new Date()),
        firstName,
        lastName,
        email,
        password,
        balance: parseFloat(balance),
        role: 'user',
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Group grow>
          <TextInput label="First Name" required onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          <TextInput label="Last Name" required onChange={(e) => setLastName(e.target.value)} value={lastName} />
        </Group>
        <Group grow>
          <TextInput
            label="Balance"
            type="number"
            step="0.01"
            required
            mt="md"
            onChange={(e) => setBalance(e.target.value)}
            value={balance}
          />
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
        <Group position="right" mt={30}>
          <Button variant="default" onClick={() => onModal(false)}>
            Cancel
          </Button>
          <Button color="green" type="submit">
            Confirm
          </Button>
        </Group>
      </form>
    </>
  );
};

export default ClientCreateUserForm;
