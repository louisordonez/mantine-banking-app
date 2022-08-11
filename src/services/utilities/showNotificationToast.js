import { Check, X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

export const showNotificationToast = (type, message) => {
  if (type === 'success') {
    showNotification({
      color: 'green',
      title: 'Success',
      message: message,
      icon: <Check size={16} />,
      autoClose: 5000,
    });
  } else if (type === 'failed') {
    showNotification({
      color: 'red',
      title: 'Failed',
      message: message,
      icon: <X size={16} />,
      autoClose: 5000,
    });
  }
};
