import React from 'react';
import { Title, Container, Paper, Group, Table, Text, Stack, Button, Menu, ActionIcon } from '@mantine/core';
import {
  User,
  Wallet,
  CashBanknote,
  CashBanknoteOff,
  ArrowBarToDown,
  ArrowBarToUp,
  ArrowsRightLeft,
  Plus,
  Dots,
  Pencil,
  Trash,
} from 'tabler-icons-react';
import { convertCurrency } from '../../../../services/utilities/convertCurrency';

const ClientUserDashboard = () => {
  return (
    <>
      <Title>Dashboard</Title>
      <Container my={40}>
        <Group grow>
          <Paper withBorder shadow="md" p={30} radius="md">
            <Group position="apart">
              <Stack>
                <Group>
                  <User />
                  <Text>
                    Account Number
                    <Text>123</Text>
                  </Text>
                </Group>
                <Group>
                  <Wallet />
                  <Text>
                    Balance
                    <Text>{convertCurrency(100)}</Text>
                  </Text>
                </Group>
              </Stack>
              <Stack>
                <Button color="green" leftIcon={<ArrowBarToDown size={16} />}>
                  Withdraw
                </Button>
                <Button color="green" leftIcon={<ArrowBarToUp size={16} />}>
                  Deposit
                </Button>
                <Button color="green" leftIcon={<ArrowsRightLeft size={16} />}>
                  Transfer
                </Button>
              </Stack>
            </Group>
          </Paper>
        </Group>
        <Group grow>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Group>
              <CashBanknote />
              <Text>Calc Expenses</Text>
            </Group>
            <Text mt={24}>{convertCurrency(100)}</Text>
          </Paper>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Group>
              <CashBanknoteOff />
              <Text>Calc Balance</Text>
            </Group>
            <Text mt={24}>{convertCurrency(-100)}</Text>
          </Paper>
        </Group>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Group position="apart">
            <Text>Expenses</Text>
            <Button color="green" leftIcon={<Plus size={16} />}>
              Add Expense
            </Button>
          </Group>
          <Table highlightOnHover mt={24}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tuition Fee</td>
                <td>{convertCurrency(80000)}</td>
                <td>
                  <Menu transition="pop" withArrow position="bottom-end">
                    <Menu.Target>
                      <ActionIcon>
                        <Dots size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item icon={<Pencil size={16} />}>Edit</Menu.Item>
                      <Menu.Item icon={<Trash size={16} />} color="red">
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </td>
              </tr>
              <tr>
                <td>Electricity</td>
                <td>{convertCurrency(4000)}</td>
                <td>
                  <Menu transition="pop" withArrow position="bottom-end">
                    <Menu.Target>
                      <ActionIcon>
                        <Dots size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item icon={<Pencil size={16} />}>Edit</Menu.Item>
                      <Menu.Item icon={<Trash size={16} />} color="red">
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </td>
              </tr>
            </tbody>
          </Table>
        </Paper>
      </Container>
    </>
  );
};

export default ClientUserDashboard;
