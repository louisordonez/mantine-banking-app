import React from 'react';
import {
  Title,
  TextInput,
  Container,
  Paper,
  Group,
  Table,
  Menu,
  ActionIcon,
} from '@mantine/core';
import {
  Search,
  ArrowBarToDown,
  ArrowBarToUp,
  Dots,
  ArrowsLeftRight,
  Pencil,
  Trash,
} from 'tabler-icons-react';
import { USER_LIST } from '../../../services/constants/userList';

const ClientUsers = () => {
  const rows = USER_LIST.map((item) => (
    <tr key={item.accountNumber}>
      <td>{item.accountNumber}</td>
      <td>{`${item.firstName} ${item.lastName}`}</td>
      <td>
        {item.balance.toLocaleString('en-US', {
          style: 'currency',
          currency: 'PHP',
        })}
      </td>
      <td>
        <Group>
          <Menu transition="pop" withArrow position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <Dots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<ArrowBarToDown size={16} />}>
                Withdraw
              </Menu.Item>
              <Menu.Item icon={<ArrowBarToUp size={16} />}>Deposit</Menu.Item>
              <Menu.Item icon={<ArrowsLeftRight size={16} />}>
                Transfer
              </Menu.Item>
              <Menu.Item icon={<Pencil size={16} />}>Edit</Menu.Item>
              <Menu.Item icon={<Trash size={16} />} color="red">
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <Title>Users</Title>
      <Container my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            placeholder="Enter account number"
            icon={<Search size={16} />}
            mb={12}
          ></TextInput>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Name</th>
                <th>Balance</th>
                <th>Actions</th>
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
