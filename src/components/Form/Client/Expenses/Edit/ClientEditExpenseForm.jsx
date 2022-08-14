import React, { useState } from 'react';
import { TextInput, Group, Button } from '@mantine/core';
import { getLocalStorageItem } from '../../../../../services/utilities/localStorage';

const ClientEditExpenseForm = ({ expenseId, onModal, onEditExpense }) => {
  const expenseListLocalStorage = getLocalStorageItem('expenseList').find((expense) => expense.id === expenseId);

  const [item, setItem] = useState(expenseListLocalStorage.item);
  const [amount, setAmount] = useState(expenseListLocalStorage.amount);

  const handleSubmit = (e) => {
    e.preventDefault();

    onEditExpense({
      item,
      expenseAmount: amount,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Group grow>
          <TextInput label="Item" required onChange={(e) => setItem(e.target.value)} value={item}></TextInput>
        </Group>
        <Group grow mt="md">
          <TextInput
            label="Amount"
            required
            type="number"
            min=".01"
            step="0.01"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            value={amount}
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

export default ClientEditExpenseForm;
