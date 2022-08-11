import React, { useState } from 'react';
import { Title, Container, Paper, Group, TextInput, Table, Menu, ActionIcon } from '@mantine/core';
import { Search, Dots, InfoCircle } from 'tabler-icons-react';
import { getLocalStorageItem } from '../../../services/utilities/localStorage';
import { getRole } from '../../../services/utilities/getRole';
import { convertDatetime } from '../../../services/utilities/convertDatetime';
import { changeAmountText } from '../../../services/utilities/changeAmountText';
import ClientModal from '../../../components/Modal/ClientModal';

const ClientTransactions = () => {
  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);

  const userDataLocalStorage = getLocalStorageItem('userData')[0];
  const transactionListLocalStorage = getLocalStorageItem('transactionList');

  const findTransaction = (referenceNumber) =>
    transactionListLocalStorage.find((transaction) => transaction.referenceNumber === referenceNumber);

  const handleModal = (bool) => (bool === true ? setOpened(true) : setOpened(false));

  const openDetailsModal = (referenceNumber) => {
    handleModal(true);
    setModalType('Details');
    handleDetails(referenceNumber);
  };

  const handleDetails = (referenceNumber) => {
    const transaction = findTransaction(referenceNumber);

    setTransactionDetails(transaction);
  };

  const showRows = () => {
    let transactions;

    getRole() === 'user'
      ? (transactions = transactionListLocalStorage.filter(
          (transaction) => transaction.accountNumber === userDataLocalStorage.accountNumber
        ))
      : (transactions = transactionListLocalStorage);

    transactions.sort((a, b) => b.referenceNumber - a.referenceNumber);

    return transactions.map((item) => (
      <tr key={item.referenceNumber}>
        <td>{item.referenceNumber}</td>
        <td>{convertDatetime(item.timestamp)}</td>
        <td>
          {(() =>
            item.description === 'Withdraw' || item.description === 'Deposit' ? item.description : 'Transfer')()}
        </td>
        <td>{changeAmountText(item.description, item.amount)}</td>
        <td>
          <Group>
            <Menu transition="pop" withArrow position="bottom-end">
              <Menu.Target>
                <ActionIcon>
                  <Dots size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<InfoCircle size={16} />} onClick={() => openDetailsModal(item.referenceNumber)}>
                  Details
                </Menu.Item>
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
      <ClientModal
        opened={opened}
        modalType={modalType}
        transactionDetails={transactionDetails}
        onModal={handleModal}
      />
    </>
  );
};

export default ClientTransactions;
