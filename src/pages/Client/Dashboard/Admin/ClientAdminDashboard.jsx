import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Container, Paper, Group, Table, Text, Anchor } from '@mantine/core';
import { Users, Cash } from 'tabler-icons-react';
import { getLocalStorageItem } from '../../../../services/utilities/localStorage';
import { convertDatetime } from '../../../../services/utilities/convertDatetime';
import { convertCurrency } from '../../../../services/utilities/convertCurrency';

const ClientAdminDashboard = () => {
  let navigate = useNavigate();

  const userListLocalStorage = getLocalStorageItem('userList');
  const transactionListLocalStorage = getLocalStorageItem('transactionList');

  const showTotalBalance = () => {
    const users = userListLocalStorage;
    const usersBalance = users.map((user) => user.balance);

    return usersBalance.reduce((a, b) => a + b, 0);
  };

  const showRecentUsersRows = () => {
    let users = userListLocalStorage;

    users.sort((a, b) => b.accountNumber - a.accountNumber);

    return users.slice(0, 5).map((item) => (
      <tr key={item.accountNumber}>
        <td>{item.accountNumber}</td>
        <td>{`${item.firstName} ${item.lastName}`}</td>
        <td>{convertCurrency(item.balance)}</td>
      </tr>
    ));
  };

  const showRecentTransactionsRows = () => {
    let transactions = transactionListLocalStorage;

    transactions.sort((a, b) => b.referenceNumber - a.referenceNumber);

    return transactions.slice(0, 5).map((item) => (
      <tr key={item.referenceNumber}>
        <td>{item.referenceNumber}</td>
        <td>{convertDatetime(item.timestamp)}</td>
        <td>{item.description}</td>
        <td>
          {(() =>
            item.description === 'Deposit' ? (
              <Text color="green">{`+ ${convertCurrency(item.amount)}`}</Text>
            ) : (
              <Text color="red">{`- ${convertCurrency(item.amount)}`}</Text>
            ))()}
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Title>Dashboard</Title>
      <Container my={40}>
        <Group grow>
          <Paper withBorder shadow="md" p={30} radius="md">
            <Group>
              <Users />
              <Text>Total Users</Text>
            </Group>
            <Text mt={24}>{userListLocalStorage.length}</Text>
          </Paper>
          <Paper withBorder shadow="md" p={30} radius="md">
            <Group>
              <Cash />
              <Text>Total Balance</Text>
            </Group>
            <Text mt={24}>{convertCurrency(showTotalBalance())}</Text>
          </Paper>
        </Group>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Group position="apart">
            <Text>Recent Users</Text>
            <Anchor color="green" onClick={() => navigate('/users')}>
              See All
            </Anchor>
          </Group>
          <Table highlightOnHover mt={24}>
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Name</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>{showRecentUsersRows()}</tbody>
          </Table>
        </Paper>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Group position="apart">
            <Text>Recent Transactions</Text>
            <Anchor color="green" onClick={() => navigate('/transactions')}>
              See All
            </Anchor>
          </Group>
          <Table highlightOnHover mt={24}>
            <thead>
              <tr>
                <th>Reference Number</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>{showRecentTransactionsRows()}</tbody>
          </Table>
        </Paper>
      </Container>
    </>
  );
};

export default ClientAdminDashboard;
