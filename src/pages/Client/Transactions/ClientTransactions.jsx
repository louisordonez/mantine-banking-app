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
import { Search, Dots, InfoCircle } from 'tabler-icons-react';
import { USER_LIST } from '../../../services/constants/userList';

const ClientTransactions = () => {
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
              <Menu.Item icon={<InfoCircle size={16} />}>Details</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <Title>Transactions</Title>
      <Container my={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            placeholder="Enter reference number"
            icon={<Search size={16} />}
            mb={16}
          ></TextInput>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Reference Number</th>
                <th>Date</th>
                <th>Description</th>
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

export default ClientTransactions;
