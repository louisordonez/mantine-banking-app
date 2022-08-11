import React, { useState, useEffect } from 'react';
import { Title, Container, Paper, Group, TextInput, Button, Table, Menu, ActionIcon } from '@mantine/core';
import { Search, Plus, Dots, Pencil, Trash } from 'tabler-icons-react';
import ClientModal from '../../../components/Modal/ClientModal';
import { getLocalStorageItem, assignLocalStorageItem } from '../../../services/utilities/localStorage';
import { convertCurrency } from '../../../services/utilities/convertCurrency';
import { showNotificationToast } from '../../../services/utilities/showNotificationToast';

const ClientUsers = () => {
  const userListLocalStorage = getLocalStorageItem('userList');

  const [opened, setOpened] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [modalType, setModalType] = useState('');
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    setUserList(userListLocalStorage);
  }, []);

  const handleModal = (bool) => (bool === true ? setOpened(true) : setOpened(false));

  const openCreateUserModal = () => {
    handleModal(true);
    setModalType('Create User');
  };

  const openEditModal = (accountNumber) => {
    handleModal(true);
    setModalType('Edit User');
    console.log(accountNumber);
  };

  const openDeleteModal = (accountNumber) => {
    handleModal(true);
    setModalType('Delete User');
    setAccountNumber(accountNumber);
  };

  const handleDeleteUser = (accountNumber) => {
    const newUserList = userList.filter((user) => user.accountNumber !== accountNumber);

    assignLocalStorageItem('userList', newUserList);
    handleModal(false);
    showNotificationToast('success', 'User deleted');
  };

  const handleCreateUser = (userInfo) => {
    assignLocalStorageItem('userList', [...userListLocalStorage, userInfo]);
    handleModal(false);
    showNotificationToast('success', 'User created');
  };

  const showUsers = () => {
    let users = userListLocalStorage.filter((user) => user.accountNumber !== 1);

    users.sort((a, b) => b.accountNumber - a.accountNumber);

    return users.map((item) => (
      <tr key={item.accountNumber}>
        <td>{item.accountNumber}</td>
        <td>{`${item.firstName} ${item.lastName}`}</td>
        <td>{convertCurrency(item.balance)}</td>
        <td>
          <Menu transition="pop" withArrow position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <Dots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<Pencil size={16} />} onClick={() => openEditModal(item.accountNumber)}>
                Edit
              </Menu.Item>
              <Menu.Item icon={<Trash size={16} />} color="red" onClick={() => openDeleteModal(item.accountNumber)}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Title>Users</Title>
      <Container my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Group position="right" mb={16}>
            <Button color="green" leftIcon={<Plus size={16} />} onClick={openCreateUserModal}>
              Create user
            </Button>
          </Group>
          <TextInput placeholder="Enter account number" icon={<Search size={16} />} mb={16}></TextInput>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Name</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{showUsers()}</tbody>
          </Table>
        </Paper>
      </Container>
      <ClientModal
        opened={opened}
        modalType={modalType}
        accountNumber={accountNumber}
        onModal={handleModal}
        onCreateUser={handleCreateUser}
        onDeleteUser={handleDeleteUser}
      />
    </>
  );
};

export default ClientUsers;
