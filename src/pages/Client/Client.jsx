import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  NavLink,
  Stack,
  Avatar,
  Text,
} from '@mantine/core';
import { Logout } from 'tabler-icons-react';
import ClientHeader from '../../components/Header/Client/ClientHeader';
import ClientAdminDashboard from './Dashboard/Admin/ClientAdminDashboard';
import ClientUserDashboard from './Dashboard/User/ClientUserDashboard';
import ClientUsers from './Users/ClientUsers';
import ClientTransactions from './Transactions/ClientTransactions';
import ClientSettings from './Settings/ClientSettings';
import NavbarLinks from '../../components/Navbar/Links/NavbarLinks';
import { getRole } from '../../services/utilities/getRole';
import { getLocalStorageItem, removeLocalStorageItem } from '../../services/utilities/localStorage';

const Client = () => {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);
  const [userData, setUserData] = useState(getLocalStorageItem('userData')[0]);
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [userAccountNumber, setUserAccountNumber] = useState('');

  useEffect(() => {
    setUserAvatar(`${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`);
    setUserName(`${userData.firstName} ${userData.lastName}`);
    setUserAccountNumber(userData.accountNumber);
  }, [userData]);

  const handleOpened = () => setOpened((o) => !o);

  const handleUserData = (userData) => setUserData(userData);

  const showNavbarLinks = () => {
    return <NavbarLinks onOpened={handleOpened} />;
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    removeLocalStorageItem('userData');
    window.location.assign('/login');
  };

  const useDisplayContent = () => {
    let params = useParams();

    switch (params.client) {
      case 'dashboard':
        return getRole() === 'admin' ? <ClientAdminDashboard /> : <ClientUserDashboard />;
      case 'users':
        return <ClientUsers />;
      case 'transactions':
        return <ClientTransactions />;
      case 'settings':
        return <ClientSettings onUserData={handleUserData} />;
      default:
        window.location.assign('/dashboard');
    }
  };

  return (
    <>
      <AppShell
        styles={{
          main: {
            background: theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Navbar.Section>
              <Stack align="center">
                <Avatar color="green" size="xl">
                  {userAvatar}
                </Avatar>
                <Text weight={700}>{userName}</Text>
                <Text size="sm">{userAccountNumber}</Text>
              </Stack>
            </Navbar.Section>
            <Navbar.Section grow mt="md">
              {showNavbarLinks()}
            </Navbar.Section>
            <Navbar.Section>
              <NavLink label="Log out" icon={<Logout size={16} />} onClick={(e) => handleLogOut(e)} />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger opened={opened} onClick={handleOpened} size="sm" color={theme.colors.gray[6]} mr="xl" />
              </MediaQuery>
              <ClientHeader />
            </div>
          </Header>
        }
      >
        {useDisplayContent()}
      </AppShell>
    </>
  );
};

export default Client;
