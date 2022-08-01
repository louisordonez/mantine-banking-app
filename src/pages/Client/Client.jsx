import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  NavLink,
} from '@mantine/core';
import { Logout } from 'tabler-icons-react';
import ClientHeader from '../../components/Header/Client/ClientHeader';
import AdminNavbarLinks from '../../components/Navbar/Links/Admin/AdminNavbarLinks';

const DisplayContent = () => {
  let params = useParams();

  switch (params.client) {
    case 'dashboard':
      return <Text>Dashboard</Text>;
    case 'users':
      return <Text>Users</Text>;
    case 'transactions':
      return <Text>Transactions</Text>;
    case 'settings':
      return <Text>Settings</Text>;
  }
};

const Client = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const handleOpened = () => setOpened((o) => !o);

  const showNavbarLinks = () => {
    return <AdminNavbarLinks onOpened={handleOpened} />;
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    window.location.assign('/login');
  };

  return (
    <>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Navbar.Section></Navbar.Section>
            <Navbar.Section grow mt="md">
              {showNavbarLinks()}
            </Navbar.Section>
            <Navbar.Section>
              <NavLink
                label="Log out"
                icon={<Logout size={16} />}
                onClick={(e) => handleLogOut(e)}
              />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={70} p="md">
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={handleOpened}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <ClientHeader />
            </div>
          </Header>
        }
      >
        {DisplayContent()}
      </AppShell>
    </>
  );
};

export default Client;
