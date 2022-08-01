import React from 'react';
import { Link } from 'react-router-dom';
import { Group, Button, Text, Divider } from '@mantine/core';
import { BuildingBank } from 'tabler-icons-react';

const ClientHeader = () => {
  return (
    <>
      <Group
        spacing={6}
        className="cursor-pointer"
        style={{ textDecoration: 'none', color: 'black' }}
        component={Link}
        to="/client"
      >
        <BuildingBank size={24} />
        <Text className="bold-text">Banking</Text>
      </Group>
    </>
  );
};

export default ClientHeader;
