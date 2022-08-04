import { getLocalStorageItem } from './localStorage';
import { showNotificationToast } from './showNotificationToast';

export const checkPassword = (password, confirmPassword) => {
  if (password !== '') {
    if (password !== confirmPassword) {
      showNotificationToast('failed', 'Password and Confirm Password do not match');
      return 'passwordConfirmPassword';
    }
  } else if (password === '') {
    showNotificationToast('failed', 'Password cannot be empty');
    return 'password';
  }
};

export const checkEmail = (email) => {
  const validate = /^\S+@\S+$/.test(email);
  const userListLocalStorage = getLocalStorageItem('userList');
  const findUser = userListLocalStorage.find((user) => user.email === email);

  if (validate === true) {
    if (findUser) {
      showNotificationToast('failed', 'Email already taken');
      return 'email';
    }
  } else {
    showNotificationToast('failed', 'Invalid Email');
    return 'email';
  }
};

export const checkName = (firstName, lastName) => {
  if (firstName === '' && lastName === '') {
    showNotificationToast('failed', 'First Name and Last Name cannot be empty');
    return 'fullName';
  } else if (firstName === '') {
    showNotificationToast('failed', 'First Name cannot be empty');
    return 'firstName';
  } else if (lastName === '') {
    showNotificationToast('failed', 'Last Name cannot be empty');
    return 'lastName';
  }
};
