import React, { useState } from 'react';
import { TextInput, Group, Button } from '@mantine/core';

const ClientWithdrawForm = ({ onWithdraw, onModal }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onWithdraw(amount);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Group grow>
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
          <Button variant="default" onClick={() => onModal(false)}>
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
