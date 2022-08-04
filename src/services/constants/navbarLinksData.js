import { Gauge, Users, Cash, Settings } from 'tabler-icons-react';

export const ADMIN_NAVBAR_LINKS_DATA = [
  { icon: Gauge, link: 'dashboard', label: 'Dashboard' },
  { icon: Users, link: 'users', label: 'Users' },
  { icon: Cash, link: 'transactions', label: 'Transactions' },
  { icon: Settings, link: 'settings', label: 'Settings' },
];

export const USER_NAVBAR_LINKS_DATA = [
  { icon: Gauge, link: 'dashboard', label: 'Dashboard' },
  { icon: Cash, link: 'transactions', label: 'Transactions' },
  { icon: Settings, link: 'settings', label: 'Settings' },
];
