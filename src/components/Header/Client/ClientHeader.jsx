import React from 'react';
import { Group, Text } from '@mantine/core';
import { BuildingBank } from 'tabler-icons-react';

const ClientHeader = () => {
  return (
    <>
      <Group
        spacing={6}
        className="cursor-pointer"
        style={{ textDecoration: 'none', color: 'black' }}
        onClick={(e) => {
          e.preventDefault();
          window.location.assign('/');
        }}
      >
        <BuildingBank size={24} />
        <Text className="bold-text">Banking</Text>
      </Group>
    </>
  );
};

export default ClientHeader;
