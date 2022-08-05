import { getLocalStorageItem } from './localStorage';
import { showNotificationToast } from './showNotificationToast';

export const checkPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    showNotificationToast('failed', 'Password and Confirm Password do not match');
    return false;
  }

  return true;
};

export const checkEmail = (email) => {
  const validate = /^\S+@\S+$/.test(email);
  const userListLocalStorage = getLocalStorageItem('userList');
  const findUser = userListLocalStorage.find((user) => user.email === email);

  if (!validate) {
    showNotificationToast('failed', 'Invalid Email');
    return false;
  } else {
    if (findUser) {
      showNotificationToast('failed', 'Email already taken');
      return false;
    } else {
      return true;
    }
  }
};
