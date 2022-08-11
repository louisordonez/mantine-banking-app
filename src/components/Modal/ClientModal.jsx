import React from 'react';
import { Modal } from '@mantine/core';
import ClientWithdrawForm from '../Form/Client/Withdraw/ClientWithdrawForm';
import ClientDepositForm from '../Form/Client/Deposit/ClientDepositForm';
import ClientTransferForm from '../Form/Client/Transfer/ClientTransferForm';
import ClientDetailsForm from '../Form/Client/Details/ClientDetailsForm';
import ClientCreateUserForm from '../Form/Client/Users/ClientCreateUserForm';

const ClientModal = ({
  opened,
  modalType,
  transactionDetails,
  onModal,
  onAccountNumber,
  onAmount,
  onWithdraw,
  onDeposit,
  onTransfer,
  onCreateUser,
}) => {
  const useDisplayForm = () => {
    switch (modalType) {
      case 'Withdraw':
        return <ClientWithdrawForm onModal={onModal} onWithdraw={onWithdraw} onAmount={onAmount} />;
      case 'Deposit':
        return <ClientDepositForm onModal={onModal} onDeposit={onDeposit} onAmount={onAmount} />;
      case 'Transfer':
        return (
          <ClientTransferForm
            onModal={onModal}
            onTransfer={onTransfer}
            onAccountNumber={onAccountNumber}
            onAmount={onAmount}
          />
        );
      case 'Add Expense':
        return <ClientWithdrawForm />;
      case 'Edit Expense':
        return <ClientWithdrawForm />;
      case 'Delete Expense':
        return <ClientWithdrawForm />;
      case 'Details':
        return <ClientDetailsForm transactionDetails={transactionDetails} />;
      case 'Create User':
        return <ClientCreateUserForm onModal={onModal} onCreateUser={onCreateUser} />;
      case 'Edit User':
        return <ClientWithdrawForm />;
      case 'Delete User':
        return <ClientWithdrawForm />;
      default:
        break;
    }
  };

  return (
    <>
      <Modal centered opened={opened} title={`${modalType}`} onClose={() => onModal(false)}>
        {useDisplayForm()}
      </Modal>
    </>
  );
};

export default ClientModal;
