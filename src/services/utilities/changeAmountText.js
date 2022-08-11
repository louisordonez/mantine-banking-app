import { Text } from '@mantine/core';
import { convertCurrency } from './convertCurrency';

export const changeAmountText = (description, amount) => {
  return description === 'Deposit' ? (
    <Text color="green">{`+ ${convertCurrency(amount)}`}</Text>
  ) : (
    <Text color="red">{`- ${convertCurrency(amount)}`}</Text>
  );
};
