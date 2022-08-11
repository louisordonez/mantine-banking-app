import React from 'react';
import { Text, Button, Group } from '@mantine/core';

const ClientDeleteUserForm = ({ accountNumber, onModal, onDeleteUser }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    onDeleteUser(accountNumber);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Text>Are you sure you want to this user?</Text>
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

export default ClientDeleteUserForm;
