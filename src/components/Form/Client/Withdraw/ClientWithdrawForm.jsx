import React from 'react';
import { TextInput, Group, Button } from '@mantine/core';

const ClientWithdrawForm = ({ onWithdraw, onWithdrawAmount, onModal }) => {
  return (
    <>
      <form onSubmit={onWithdraw}>
        <Group grow>
          <TextInput
            label="Amount"
            required
            type="number"
            min=".01"
            step="0.01"
            onChange={(e) => onWithdrawAmount(e.target.value)}
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

export default ClientWithdrawForm;
