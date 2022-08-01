import React from 'react';
import { Group, Button, Text, Divider } from '@mantine/core';
import { BuildingBank } from 'tabler-icons-react';

const LandingHeader = () => {
  return (
    <>
      <Group position="apart" className="landing-header-container">
        <Group spacing={6} className="cursor-pointer">
          <BuildingBank size={24} />
          <Text className="bold-text">Banking</Text>
        </Group>
        <Button variant="outline">Sign in</Button>
      </Group>
      <Divider my="sm" />
    </>
  );
};

export default LandingHeader;
