import React, { useEffect, useState } from 'react';
import { Title, Container, Paper, Group, Table, Text, Stack, Button, Menu, ActionIcon } from '@mantine/core';
import {
  User,
  Wallet,
  CashBanknote,
  CashBanknoteOff,
  ArrowBarToDown,
  ArrowBarToUp,
  ArrowsRightLeft,
  Plus,
  Dots,
  Pencil,
  Trash,
} from 'tabler-icons-react';
import ClientModal from '../../../../components/Modal/ClientModal';
import { convertCurrency } from '../../../../services/utilities/convertCurrency';
import { convertDatetime } from '../../../../services/utilities/convertDatetime';
import { getLocalStorageItem, assignLocalStorageItem } from '../../../../services/utilities/localStorage';
import { showNotificationToast } from '../../../../services/utilities/showNotificationToast';

const ClientUserDashboard = () => {
  const userDataLocalStorage = getLocalStorageItem('userData')[0];
  const userListLocalStorage = getLocalStorageItem('userList');
  const findUser = userListLocalStorage.find((user) => user.accountNumber === userDataLocalStorage.accountNumber);
  const transactionListLocalStorage = getLocalStorageItem('transactionList');
  const expenseListLocalStorage = getLocalStorageItem('expenseList');

  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState('');
  const [balance, setBalance] = useState('');
  const [userList, setUserList] = useState(null);
  const [expenseList, setExpenseList] = useState(null);
  const [expenseId, setExpenseId] = useState('');

  useEffect(() => {
    setBalance(findUser.balance);
    setUserList(userListLocalStorage);
    setExpenseList(expenseListLocalStorage);
    showCalcExpenses();
  }, [balance, findUser.balance]);

  const handleModal = (bool) => (bool === true ? setOpened(true) : setOpened(false));

  const openModal = (modalType) => {
    handleModal(true);
    setModalType(modalType);
  };

  const findUserIndex = (accountNumber) => userList.findIndex((user) => user.accountNumber === accountNumber);

  const filterExpenses = () =>
    expenseListLocalStorage.filter((expense) => expense.accountNumber === userDataLocalStorage.accountNumber);

  const handleCreateTransaction = (mode, amount, accountNumber) => {
    let newTransaction = {
      referenceNumber: Date.parse(new Date()),
      accountNumber: userDataLocalStorage.accountNumber,
      description: mode,
      amount: amount,
      timestamp: new Date(),
    };

    if (mode === 'Transfer') {
      newTransaction.description = `${userDataLocalStorage.accountNumber} Transfer to ${accountNumber}`;
    }

    assignLocalStorageItem('transactionList', [...transactionListLocalStorage, newTransaction]);
  };

  const handleWithdraw = (withdrawAmount) => {
    const index = findUserIndex(userDataLocalStorage.accountNumber);

    if (withdrawAmount > userList[index].balance) {
      showNotificationToast('failed', 'Insufficent balance');
      return false;
    }

    userList[index].balance -= withdrawAmount;

    assignLocalStorageItem('userList', userList);
    handleCreateTransaction('Withdraw', withdrawAmount);
    handleModal(false);
  };

  const handleDeposit = (depositAmount) => {
    const index = findUserIndex(userDataLocalStorage.accountNumber);

    userList[index].balance += depositAmount;

    assignLocalStorageItem('userList', userList);
    handleCreateTransaction('Deposit', depositAmount);
    handleModal(false);
  };

  const handleTransfer = ({ accountNumber, transferAmount }) => {
    const userTransferFromIndex = findUserIndex(userDataLocalStorage.accountNumber);
    const userTransferToIndex = findUserIndex(accountNumber);

    if (userTransferToIndex === -1) {
      showNotificationToast('failed', 'Invalid account number');
    } else {
      userList[userTransferFromIndex].balance -= transferAmount;
      userList[userTransferToIndex].balance += transferAmount;

      assignLocalStorageItem('userList', userList);
      handleCreateTransaction('Transfer', transferAmount, accountNumber);
      handleModal(false);
    }
  };

  const handleAddExpense = ({ item, expenseAmount }) => {
    assignLocalStorageItem('expenseList', [
      ...expenseListLocalStorage,
      {
        id: Date.parse(new Date()),
        accountNumber: userDataLocalStorage.accountNumber,
        item: item,
        amount: expenseAmount,
        timestamp: new Date(),
      },
    ]);
    handleModal(false);
  };

  const handleDeleteExpense = (bool) => {
    if (bool === true) {
      const newExpenseList = expenseList.filter((user) => user.id !== expenseId);

      assignLocalStorageItem('expenseList', newExpenseList);
      showNotificationToast('success', 'Item deleted');
      handleModal(false);
    }
  };

  const showCalcExpenses = () => {
    const expenses = filterExpenses();
    const expensesAmount = expenses.map((item) => item.amount);

    return expensesAmount.reduce((a, b) => a + b, 0);
  };

  const showCalcBalance = () => convertCurrency(balance - showCalcExpenses());

  const showExpenses = () => {
    const expenses = filterExpenses();

    return expenses.map((item) => (
      <tr key={item.id}>
        <td>{item.item}</td>
        <td>{convertCurrency(item.amount)}</td>
        <td>{convertDatetime(item.timestamp)}</td>
        <td>
          <Menu transition="pop" withArrow position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <Dots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<Pencil size={16} />} onClick={() => openModal('Edit Expense', item.id)}>
                Edit
              </Menu.Item>
              <Menu.Item
                icon={<Trash size={16} />}
                color="red"
                onClick={() => {
                  openModal('Delete Expense');
                  setExpenseId(item.id);
                }}
              >
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
      <Title>Dashboard</Title>
      <Container my={40}>
        <Group grow>
          <Paper withBorder shadow="md" p={30} radius="md">
            <Group position="apart">
              <Stack>
                <Group>
                  <User />
                  <Text>
                    Account Number
                    <Text>{userDataLocalStorage.accountNumber}</Text>
                  </Text>
                </Group>
                <Group>
                  <Wallet />
                  <Text>
                    Balance
                    <Text>{convertCurrency(balance)}</Text>
                  </Text>
                </Group>
              </Stack>
              <Stack>
                <Button color="green" leftIcon={<ArrowBarToDown size={16} />} onClick={() => openModal('Withdraw')}>
                  Withdraw
                </Button>
                <Button color="green" leftIcon={<ArrowBarToUp size={16} />} onClick={() => openModal('Deposit')}>
                  Deposit
                </Button>
                <Button color="green" leftIcon={<ArrowsRightLeft size={16} />} onClick={() => openModal('Transfer')}>
                  Transfer
                </Button>
              </Stack>
            </Group>
          </Paper>
        </Group>
        <Group grow>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Group>
              <CashBanknote />
              <Text>Calc Expenses</Text>
            </Group>
            <Text mt={24}>{convertCurrency(showCalcExpenses())}</Text>
          </Paper>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Group>
              <CashBanknoteOff />
              <Text>Calc Balance</Text>
            </Group>
            <Text mt={24}>{showCalcBalance()}</Text>
          </Paper>
        </Group>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Group position="apart">
            <Text>Expenses</Text>
            <Button color="green" leftIcon={<Plus size={16} />} onClick={() => openModal('Add Expense')}>
              Add Expense
            </Button>
          </Group>
          <Table highlightOnHover mt={24}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
                <th>Date Added</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{showExpenses()}</tbody>
          </Table>
        </Paper>
      </Container>
      <ClientModal
        opened={opened}
        modalType={modalType}
        onModal={handleModal}
        onWithdraw={handleWithdraw}
        onDeposit={handleDeposit}
        onTransfer={handleTransfer}
        onAddExpense={handleAddExpense}
        onDeleteExpense={handleDeleteExpense}
      />
    </>
  );
};

export default ClientUserDashboard;
