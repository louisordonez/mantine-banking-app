export const convertCurrency = (amount) =>
  amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'PHP',
  });
