import React from 'react';
import { Modal } from '@mantine/core';
import ClientWithdrawForm from '../Form/Client/Withdraw/ClientWithdrawForm';
import ClientDepositForm from '../Form/Client/Deposit/ClientDepositForm';
import ClientTransferForm from '../Form/Client/Transfer/ClientTransferForm';
import ClientDetailsForm from '../Form/Client/Details/ClientDetailsForm';
import ClientCreateUserForm from '../Form/Client/Users/Create/ClientCreateUserForm';
import ClientEditUserForm from '../Form/Client/Users/Edit/ClientEditUserForm';
import ClientDeleteUserForm from '../Form/Client/Users/Delete/ClientDeleteUserForm';
import ClientAddExpenseForm from '../Form/Client/Expenses/Add/ClientAddExpenseForm';
import ClientDeleteExpenseForm from '../Form/Client/Expenses/Delete/ClientDeleteExpenseForm';

const ClientModal = ({
  opened,
  modalType,
  transactionDetails,
  accountNumber,
  onModal,
  onWithdraw,
  onDeposit,
  onTransfer,
  onCreateUser,
  onEditUser,
  onDeleteUser,
  onAddExpense,
  onDeleteExpense,
}) => {
  const useDisplayForm = () => {
    switch (modalType) {
      case 'Withdraw':
        return <ClientWithdrawForm onModal={onModal} onWithdraw={onWithdraw} />;
      case 'Deposit':
        return <ClientDepositForm onModal={onModal} onDeposit={onDeposit} />;
      case 'Transfer':
        return <ClientTransferForm onModal={onModal} onTransfer={onTransfer} />;
      case 'Add Expense':
        return <ClientAddExpenseForm onModal={onModal} onAddExpense={onAddExpense} />;
      case 'Edit Expense':
        return <ClientWithdrawForm />;
      case 'Delete Expense':
        return <ClientDeleteExpenseForm onModal={onModal} onDeleteExpense={onDeleteExpense} />;
      case 'Details':
        return <ClientDetailsForm transactionDetails={transactionDetails} />;
      case 'Create User':
        return <ClientCreateUserForm onModal={onModal} onCreateUser={onCreateUser} />;
      case 'Edit User':
        return <ClientEditUserForm accountNumber={accountNumber} onModal={onModal} onEditUser={onEditUser} />;
      case 'Delete User':
        return <ClientDeleteUserForm accountNumber={accountNumber} onModal={onModal} onDeleteUser={onDeleteUser} />;
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
