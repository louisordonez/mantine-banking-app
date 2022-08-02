import React from 'react';
import {
  Title,
  Container,
  Paper,
  Group,
  Table,
  Text,
  Anchor,
} from '@mantine/core';
import { Users, Cash } from 'tabler-icons-react';

const ClientAdminDashboard = () => {
  return (
    <>
      <Title>Dashboard</Title>
      <Container my={40}>
        <Group grow>
          <Paper withBorder shadow="md" p={30} radius="md">
            <Group>
              <Users />
              <Text>Total Users</Text>
            </Group>
            <Text mt={24}>1</Text>
          </Paper>
          <Paper withBorder shadow="md" p={30} radius="md">
            <Group>
              <Cash />
              <Text>Total Balance</Text>
            </Group>
            <Text mt={24}>100.00</Text>
          </Paper>
        </Group>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Group position="apart">
            <Text>Recent Users</Text>
            <Anchor color="green">See All</Anchor>
          </Group>
          <Table highlightOnHover mt={24}>
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Name</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>123</td>
                <td>John Doe</td>
                <td>100.00</td>
              </tr>
              <tr>
                <td>123</td>
                <td>John Doe</td>
                <td>100.00</td>
              </tr>
              <tr>
                <td>123</td>
                <td>John Doe</td>
                <td>100.00</td>
              </tr>
              <tr>
                <td>123</td>
                <td>John Doe</td>
                <td>100.00</td>
              </tr>
              <tr>
                <td>123</td>
                <td>John Doe</td>
                <td>100.00</td>
              </tr>
            </tbody>
          </Table>
        </Paper>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Group position="apart">
            <Text>Recent Transactions</Text>
            <Anchor color="green">See All</Anchor>
          </Group>
          <Table highlightOnHover mt={24}>
            <thead>
              <tr>
                <th>Reference Number</th>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>123</td>
                <td>02/02/2022, 02:02:02</td>
                <td>Withdraw</td>
              </tr>
              <tr>
                <td>123</td>
                <td>02/02/2022, 02:02:02</td>
                <td>Withdraw</td>
              </tr>
              <tr>
                <td>123</td>
                <td>02/02/2022, 02:02:02</td>
                <td>Withdraw</td>
              </tr>
              <tr>
                <td>123</td>
                <td>02/02/2022, 02:02:02</td>
                <td>Withdraw</td>
              </tr>
              <tr>
                <td>123</td>
                <td>02/02/2022, 02:02:02</td>
                <td>Withdraw</td>
              </tr>
              <tr>
                <td>123</td>
                <td>02/02/2022, 02:02:02</td>
                <td>Withdraw</td>
              </tr>
            </tbody>
          </Table>
        </Paper>
      </Container>
    </>
  );
};

export default ClientAdminDashboard;
