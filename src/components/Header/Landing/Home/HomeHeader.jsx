import React from 'react';
import { Link } from 'react-router-dom';
import { Group, Button, Text, Divider } from '@mantine/core';
import { BuildingBank } from 'tabler-icons-react';

const HomeHeader = () => {
  return (
    <>
      <Group position="apart" className="home-header-container">
        <Group
          spacing={6}
          className="cursor-pointer"
          style={{ textDecoration: 'none', color: 'black' }}
          component={Link}
          to="/"
        >
          <BuildingBank size={24} />
          <Text className="bold-text">Banking</Text>
        </Group>
        <Button variant="outline" component={Link} to="/login" color="green">
          Sign in
        </Button>
      </Group>
      <Divider my="sm" style={{ marginBottom: 0 }} />
    </>
  );
};

export default HomeHeader;
