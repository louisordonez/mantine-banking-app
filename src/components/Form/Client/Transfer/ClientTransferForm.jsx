import React, { useState } from 'react';
import { TextInput, Group, Button } from '@mantine/core';

const ClientTransferForm = ({ onAccountNumber, onAmount, onTransfer, onModal }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onTransfer({
      accountNumber,
      transferAmount: amount,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Group grow>
          <TextInput
            label="Account Number"
            required
            type="number"
            onChange={(e) => setAccountNumber(parseInt(e.target.value))}
          ></TextInput>
        </Group>
        <Group grow mt="md">
          <TextInput
            label="Amount"
            required
            type="number"
            min=".01"
            step="0.01"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          ></TextInput>
        </Group>
        <Group position="right" mt={30}>
          <Button variant="default" onClick={onModal}>
            Cancel
          </Button>
          <Button color="green" type="submit">
            Confirm
          </Button>
        </Group>
      </form>
    </>
  );
};

export default ClientTransferForm;
