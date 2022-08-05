import React from 'react';
import { Modal } from '@mantine/core';
import ClientWithdrawForm from '../Form/Client/Withdraw/ClientWithdrawForm';

const ClientModal = ({ opened, modalType, onModal, onWithdraw, onWithdrawAmount }) => {
  const useDisplayForm = () => {
    switch (modalType) {
      case 'Withdraw':
        return <ClientWithdrawForm onModal={onModal} onWithdraw={onWithdraw} onWithdrawAmount={onWithdrawAmount} />;
      case 'Deposit':
        return <ClientWithdrawForm />;
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
