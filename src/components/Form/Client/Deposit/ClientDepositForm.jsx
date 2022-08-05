import React from 'react';
import { TextInput, Group, Button } from '@mantine/core';

const ClientDepositForm = ({ onAmount, onDeposit, onModal }) => {
  return (
    <>
      <form onSubmit={onDeposit}>
        <Group grow>
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

export default ClientDepositForm;
