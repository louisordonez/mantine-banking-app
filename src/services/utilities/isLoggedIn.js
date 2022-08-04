import { getLocalStorageItem } from './localStorage';

export const isLoggedIn = () => {
  const userDataLocalStorage = getLocalStorageItem('userData');

  return userDataLocalStorage !== null ? true : false;
};
