import React from 'react';
import { Text } from '@mantine/core';
import { convertDatetime } from '../../../../services/utilities/convertDatetime';
import { changeAmountText } from '../../../../services/utilities/changeAmountText';

const ClientDetailsForm = ({ transactionDetails }) => {
  return (
    <>
      <Text weight={500}>Reference Number</Text>
      <Text>{transactionDetails.referenceNumber}</Text>
      <Text mt="md" weight={500}>
        Date
      </Text>
      <Text>{convertDatetime(transactionDetails.timestamp)}</Text>
      <Text mt="md" weight={500}>
        Description
      </Text>
      <Text>{transactionDetails.description}</Text>
      <Text mt="md" weight={500}>
        Amount
      </Text>
      <Text>{changeAmountText(transactionDetails.description, transactionDetails.amount)}</Text>
    </>
  );
};

export default ClientDetailsForm;
