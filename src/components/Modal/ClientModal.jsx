import React from 'react';
import { Modal } from '@mantine/core';
import ClientWithdrawForm from '../Form/Client/Withdraw/ClientWithdrawForm';
import ClientDepositForm from '../Form/Client/Deposit/ClientDepositForm';

const ClientModal = ({ opened, modalType, onModal, onAmount, onWithdraw, onDeposit }) => {
  const useDisplayForm = () => {
    switch (modalType) {
      case 'Withdraw':
        return <ClientWithdrawForm onModal={onModal} onWithdraw={onWithdraw} onAmount={onAmount} />;
      case 'Deposit':
        return <ClientDepositForm onModal={onModal} onDeposit={onDeposit} onAmount={onAmount} />;
      case 'Transfer':
        return <ClientWithdrawForm />;
      case 'Add Expense':
        return <ClientWithdrawForm />;
      case 'Edit Expense':
        return <ClientWithdrawForm />;
      case 'Delete Expense':
        return <ClientWithdrawForm />;
      default:
        break;
    }
  };

  return (
    <>
      <Modal centered opened={opened} title={`${modalType}`} onClose={onModal}>
        {useDisplayForm()}
      </Modal>
    </>
  );
};

export default ClientModal;
