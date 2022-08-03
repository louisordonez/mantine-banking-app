export const convertDatetime = (datetime) =>
  datetime.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour12: 'false',
  });
