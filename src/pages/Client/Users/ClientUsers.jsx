import React from 'react';
import { Title, Container, Paper, Group, TextInput, Button, Table, Menu, ActionIcon } from '@mantine/core';
import { Search, Plus, Dots, ArrowBarToDown, ArrowBarToUp, ArrowsRightLeft, Pencil, Trash } from 'tabler-icons-react';
import { USER_LIST } from '../../../services/constants/userList';
import { convertCurrency } from '../../../services/utilities/convertCurrency';

const ClientUsers = () => {
  const rows = USER_LIST.map((item) => (
    <tr key={item.accountNumber}>
      <td>{item.accountNumber}</td>
      <td>{`${item.firstName} ${item.lastName}`}</td>
      <td>{convertCurrency(item.balance)}</td>
      <td>
        <Menu transition="pop" withArrow position="bottom-end">
          <Menu.Target>
            <ActionIcon>
              <Dots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<ArrowBarToDown size={16} />}>Withdraw</Menu.Item>
            <Menu.Item icon={<ArrowBarToUp size={16} />}>Deposit</Menu.Item>
            <Menu.Item icon={<ArrowsRightLeft size={16} />}>Transfer</Menu.Item>
            <Menu.Item icon={<Pencil size={16} />}>Edit</Menu.Item>
            <Menu.Item icon={<Trash size={16} />} color="red">
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <>
      <Title>Users</Title>
      <Container my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Group position="right" mb={16}>
            <Button color="green" leftIcon={<Plus size={16} />}>
              Create user
            </Button>
          </Group>
          <TextInput placeholder="Enter account number" icon={<Search size={16} />} mb={16}></TextInput>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Name</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Paper>
      </Container>
    </>
  );
};

export default ClientUsers;
