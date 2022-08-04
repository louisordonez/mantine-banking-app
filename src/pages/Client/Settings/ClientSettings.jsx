import React, { useEffect, useState } from 'react';
import { Title } from '@mantine/core';
import ClientSettingsForm from '../../../components/Form/Client/Settings/ClientSettingsForm';
import { getLocalStorageItem, assignLocalStorageItem } from '../../../services/utilities/localStorage';
import { getRole } from '../../../services/utilities/getRole';

const ClientSettings = ({ onUserData }) => {
  const userDataLocalStorage = getLocalStorageItem('userData')[0];
  const userListLocalStorage = getLocalStorageItem('userList');

  const [userList, setUserList] = useState(null);

  useEffect(() => {
    setUserList(userListLocalStorage);
  }, []);

  const handleSettings = (userData) => {
    const findUserIndex = userList.findIndex((user) => user.accountNumber === userDataLocalStorage.accountNumber);

    userList[findUserIndex].firstName = userData.firstName;
    userList[findUserIndex].lastName = userData.lastName;
    userList[findUserIndex].email = userData.email;
    userList[findUserIndex].password = userData.password;

    assignLocalStorageItem('userData', [
      {
        accountNumber: userDataLocalStorage.accountNumber,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: getRole(),
      },
    ]);
    assignLocalStorageItem('userList', userList);
    onUserData(userData);
  };

  return (
    <>
      <Title>Settings</Title>
      <ClientSettingsForm onSettings={handleSettings} />
    </>
  );
};

export default ClientSettings;
