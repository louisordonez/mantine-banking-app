import React from 'react';
import { Text, Button, Group } from '@mantine/core';

const ClientDeleteExpenseForm = ({ onDeleteExpense, onModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    onDeleteExpense(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Text>Are you sure you want to this item?</Text>
        <Group position="right" mt={30}>
          <Button variant="default" onClick={() => onModal(false)}>
            Cancel
          </Button>
          <Button color="red" type="submit">
            Confirm
          </Button>
        </Group>
      </form>
    </>
  );
};

export default ClientDeleteExpenseForm;
