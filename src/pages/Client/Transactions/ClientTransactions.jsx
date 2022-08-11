import React, { useState } from 'react';
import { Title, Container, Paper, Group, TextInput, Table, Menu, ActionIcon } from '@mantine/core';
import ClientModal from '../../../components/Modal/ClientModal';
import { Search, Dots, InfoCircle } from 'tabler-icons-react';
import { getLocalStorageItem } from '../../../services/utilities/localStorage';
import { getRole } from '../../../services/utilities/getRole';
import { convertDatetime } from '../../../services/utilities/convertDatetime';
import { changeDescriptionText } from '../../../services/utilities/changeDescriptionText';
import { changeAmountText } from '../../../services/utilities/changeAmountText';

const ClientTransactions = () => {
  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [searchReferenceNumber, setSearchReferenceNumber] = useState('');

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

  const showTransactions = () => {
    let transactions;

    getRole() === 'user'
      ? (transactions = transactionListLocalStorage.filter(
          (transaction) => transaction.accountNumber === userDataLocalStorage.accountNumber
        ))
      : (transactions = transactionListLocalStorage);

    searchReferenceNumber === ''
      ? (transactions = transactions.sort((a, b) => b.referenceNumber - a.referenceNumber))
      : (transactions = transactions.filter(
          (transaction) => transaction.referenceNumber === parseInt(searchReferenceNumber)
        ));

    return transactions.map((item) => (
      <tr key={item.referenceNumber}>
        <td>{item.referenceNumber}</td>
        <td>{convertDatetime(item.timestamp)}</td>
        <td>{changeDescriptionText(item.description)}</td>
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
          <TextInput
            placeholder="Enter reference number"
            type="number"
            icon={<Search size={16} />}
            mb={16}
            onChange={(e) => setSearchReferenceNumber(e.target.value)}
          ></TextInput>
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
            <tbody>{showTransactions()}</tbody>
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
