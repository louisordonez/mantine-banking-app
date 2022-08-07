import React from 'react';
import { Title, Container, Paper, Group, TextInput, Table, Menu, ActionIcon } from '@mantine/core';
import { Search, Dots, InfoCircle } from 'tabler-icons-react';
import { convertCurrency } from '../../../services/utilities/convertCurrency';
import { getLocalStorageItem } from '../../../services/utilities/localStorage';
import { getRole } from '../../../services/utilities/getRole';
import { convertDatetime } from '../../../services/utilities/convertDatetime';

const TRANSACTION_LIST = [
  {
    id: 1,
    accountNumber: 1756480543042,
    referenceNumber: 3756480543042,
    description: 'Withdraw',
    timestamp: convertDatetime(new Date()),
    amount: 4000.0,
  },
  {
    id: 2,
    accountNumber: 1756480543042,
    referenceNumber: 3756480543044,
    description: 'Deposit',
    timestamp: convertDatetime(new Date()),
    amount: 8000.0,
  },
  {
    id: 3,
    accountNumber: 2756480543042,
    referenceNumber: 33756480543042,
    description: '2756480543042 Transfer to 1756480543042',
    timestamp: convertDatetime(new Date()),
    amount: 4000.0,
  },
];

const ClientTransactions = () => {
  const userDataLocalStorage = getLocalStorageItem('userData')[0];

  const showRows = () => {
    let transactions;

    getRole() === 'user'
      ? (transactions = TRANSACTION_LIST.filter(
          (transaction) => transaction.accountNumber === userDataLocalStorage.accountNumber
        ))
      : (transactions = TRANSACTION_LIST);

    return transactions.map((item) => (
      <tr key={item.id}>
        <td>{item.referenceNumber}</td>
        <td>{item.timestamp}</td>
        <td>{item.description}</td>
        <td>{convertCurrency(item.amount)}</td>
        <td>
          <Group>
            <Menu transition="pop" withArrow position="bottom-end">
              <Menu.Target>
                <ActionIcon>
                  <Dots size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<InfoCircle size={16} />}>Details</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Title>Transactions</Title>
      <Container my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput placeholder="Enter reference number" icon={<Search size={16} />} mb={16}></TextInput>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Reference Number</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{showRows()}</tbody>
          </Table>
        </Paper>
      </Container>
    </>
  );
};

export default ClientTransactions;
