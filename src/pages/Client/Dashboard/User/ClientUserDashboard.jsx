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
import { getLocalStorageItem, assignLocalStorageItem } from '../../../../services/utilities/localStorage';
import { showNotificationToast } from '../../../../services/utilities/showNotificationToast';

const EXPENSE_LIST = [
  {
    // id: Date.parse(new Date())
    id: 1,
    accountNumber: 1756480543042,
    item: 'Tuition Fee',
    amount: 80000.0,
  },
  {
    // id: Date.parse(new Date())
    id: 2,
    accountNumber: 1756480543042,
    item: 'Electricity',
    amount: 4000.0,
  },
  {
    // id: Date.parse(new Date())
    id: 2,
    accountNumber: 2756480543042,
    item: 'Electricity',
    amount: 4000.0,
  },
];

const ClientUserDashboard = () => {
  const userDataLocalStorage = getLocalStorageItem('userData')[0];
  const userListLocalStorage = getLocalStorageItem('userList');
  const expenseListLocalStorage = getLocalStorageItem('expenseList');
  const transactionListLocalStorage = getLocalStorageItem('transactionList');
  const findUser = userListLocalStorage.find((user) => user.accountNumber === userDataLocalStorage.accountNumber);

  const [balance, setBalance] = useState(0);
  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState('');
  const [amount, setAmount] = useState(0);
  const [userList, setUserList] = useState(null);
  const [expenseList, setExpenseList] = useState(null);

  useEffect(() => {
    setBalance(findUser.balance);
    setUserList(userListLocalStorage);
    setExpenseList(expenseListLocalStorage);
    showCalcExpenses();
  }, [balance, findUser.balance]);

  const findUserIndex = () => {
    return userList.findIndex((user) => user.accountNumber === userDataLocalStorage.accountNumber);
  };

  const filterUser = () =>
    EXPENSE_LIST.filter((expense) => expense.accountNumber === userDataLocalStorage.accountNumber);

  const handleWithdraw = (e) => {
    e.preventDefault();

    const index = findUserIndex();

    if (amount > userList[index].balance) {
      showNotificationToast('failed', 'Insufficent balance');
      return false;
    }

    userList[index].balance -= amount;

    assignLocalStorageItem('userList', userList);
    assignLocalStorageItem('transactionList', [
      ...transactionListLocalStorage,
      {
        referenceNumber: Date.parse(new Date()),
        accountNumber: userDataLocalStorage.accountNumber,
        description: 'Withdraw',
        amount: amount,
        timestamp: new Date(),
      },
    ]);
    handleModal();
  };

  const handleDeposit = (e) => {
    e.preventDefault();

    const index = findUserIndex();

    userList[index].balance += amount;

    assignLocalStorageItem('userList', userList);
    assignLocalStorageItem('transactionList', [
      ...transactionListLocalStorage,
      {
        referenceNumber: Date.parse(new Date()),
        accountNumber: userDataLocalStorage.accountNumber,
        description: 'Deposit',
        amount: amount,
        timestamp: new Date(),
      },
    ]);
    handleModal();
  };

  const handleModal = () => setOpened((o) => !o);

  const openWithdrawModal = () => {
    handleModal();
    setModalType('Withdraw');
  };

  const openDepositModal = () => {
    handleModal();
    setModalType('Deposit');
  };

  const openTransferModal = () => {
    handleModal();
    setModalType('Transfer');
  };

  const openAddExpenseModal = () => {
    handleModal();
    setModalType('Add Expense');
  };

  const openEditExpenseModal = (id) => {
    console.log(id);
    handleModal();
    setModalType('Edit Expense');
  };

  const openDeleteExpenseModal = (id) => {
    console.log(id);
    handleModal();
    setModalType('Delete Expense');
  };

  const showCalcExpenses = () => {
    const expenses = filterUser();
    const expensesAmount = expenses.map((item) => item.amount);

    return expensesAmount.reduce((a, b) => a + b, 0);
  };

  const showCalcBalance = () => {
    return convertCurrency(balance - showCalcExpenses());
  };

  const showRows = () => {
    const expenses = filterUser();

    return expenses.map((item) => (
      <tr key={item.id}>
        <td>{item.item}</td>
        <td>{convertCurrency(item.amount)}</td>
        <td>
          <Menu transition="pop" withArrow position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <Dots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<Pencil size={16} />} onClick={() => openEditExpenseModal(item.id)}>
                Edit
              </Menu.Item>
              <Menu.Item icon={<Trash size={16} />} onClick={() => openDeleteExpenseModal(item.id)} color="red">
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
                <Button color="green" leftIcon={<ArrowBarToDown size={16} />} onClick={openWithdrawModal}>
                  Withdraw
                </Button>
                <Button color="green" leftIcon={<ArrowBarToUp size={16} />} onClick={openDepositModal}>
                  Deposit
                </Button>
                <Button color="green" leftIcon={<ArrowsRightLeft size={16} />} onClick={openTransferModal}>
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
            <Button color="green" leftIcon={<Plus size={16} />} onClick={openAddExpenseModal}>
              Add Expense
            </Button>
          </Group>
          <Table highlightOnHover mt={24}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{showRows()}</tbody>
          </Table>
        </Paper>
      </Container>
      <ClientModal
        opened={opened}
        modalType={modalType}
        onModal={handleModal}
        onAmount={setAmount}
        onWithdraw={handleWithdraw}
        onDeposit={handleDeposit}
      />
    </>
  );
};

export default ClientUserDashboard;
