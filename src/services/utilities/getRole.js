import { getLocalStorageItem } from './localStorage';

export const getRole = () => {
  const role = getLocalStorageItem('userData')[0].role;

  return role === 'admin' ? 'admin' : 'user';
};
