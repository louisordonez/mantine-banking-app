import React, { useState } from 'react';
import { TextInput, Group, Button } from '@mantine/core';

const ClientAddExpenseForm = ({ onModal, onAddExpense }) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddExpense({
      item,
      expenseAmount: amount,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Group grow>
          <TextInput label="Item" required onChange={(e) => setItem(e.target.value)}></TextInput>
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

export default ClientAddExpenseForm;
