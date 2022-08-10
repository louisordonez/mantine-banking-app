import React from 'react';
import { TextInput, Group, Button } from '@mantine/core';

const ClientTransferForm = ({ onAccountNumber, onAmount, onTransfer, onModal }) => {
  return (
    <>
      <form onSubmit={onTransfer}>
        <Group grow>
          <TextInput
            label="Account Number"
            required
            type="number"
            onChange={(e) => onAccountNumber(parseInt(e.target.value))}
          ></TextInput>
        </Group>
        <Group grow mt="md">
          <TextInput
            label="Amount"
            required
            type="number"
            min=".01"
            step="0.01"
            onChange={(e) => onAmount(parseFloat(e.target.value))}
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
