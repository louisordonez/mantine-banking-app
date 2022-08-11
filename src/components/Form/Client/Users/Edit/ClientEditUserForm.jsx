import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Group } from '@mantine/core';
import { showNotificationToast } from '../../../../../services/utilities/showNotificationToast';
import { checkPassword } from '../../../../../services/utilities/userDataValidation';
import { getLocalStorageItem } from '../../../../../services/utilities/localStorage';

const ClientEditUserForm = ({ accountNumber, onModal, onEditUser }) => {
  const userDataLocalStorage = getLocalStorageItem('userData')[0];
  const userListLocalStorage = getLocalStorageItem('userList');
  const findUser = userListLocalStorage.find((user) => user.accountNumber === accountNumber);

  const [firstName, setFirstName] = useState(findUser.firstName);
  const [lastName, setLastName] = useState(findUser.lastName);
  const [balance, setBalance] = useState(findUser.balance);
  const [email, setEmail] = useState(findUser.email);
  const [password, setPassword] = useState(findUser.password);
  const [confirmPassword, setConfirmPassword] = useState(findUser.password);

  const handlePassword = () => {
    return checkPassword(password, confirmPassword);
  };

  const handleEmail = () => {
    const validate = /^\S+@\S+$/.test(email);
    const findEmail = userListLocalStorage
      .filter((user) => user.email !== findUser.email)
      .find((user) => user.email === email);

    if (!validate) {
      showNotificationToast('failed', 'Invalid Email');
      return false;
    } else {
      if (findEmail) {
        showNotificationToast('failed', 'Email already taken');
        return false;
      } else {
        return true;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkValidation = () => {
      return handleEmail() && handlePassword() ? true : false;
    };

    if (checkValidation()) {
      onEditUser({
        accountNumber: accountNumber,
        firstName,
        lastName,
        email,
        password,
        balance: parseFloat(balance),
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

export default ClientEditUserForm;
