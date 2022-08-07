import React from 'react';
import { Title, Container, Paper, Group, TextInput, Table, Menu, ActionIcon } from '@mantine/core';
import { Search, Dots, InfoCircle } from 'tabler-icons-react';
import { convertCurrency } from '../../../services/utilities/convertCurrency';
import { getLocalStorageItem } from '../../../services/utilities/localStorage';
import { getRole } from '../../../services/utilities/getRole';
import { convertDatetime } from '../../../services/utilities/convertDatetime';

const ClientTransactions = () => {
  const userDataLocalStorage = getLocalStorageItem('userData')[0];
  const transactionListLocalStorage = getLocalStorageItem('transactionList');

  const showRows = () => {
    let transactions;

    getRole() === 'user'
      ? (transactions = transactionListLocalStorage.filter(
          (transaction) => transaction.accountNumber === userDataLocalStorage.accountNumber
        ))
      : (transactions = transactionListLocalStorage);

    return transactions.map((item) => (
      <tr key={item.referenceNumber}>
        <td>{item.referenceNumber}</td>
        <td>{convertDatetime(item.timestamp)}</td>
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
