export const convertDatetime = (timestamp) => {
  const datetime = new Date(timestamp);
  const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return datetime.toLocaleString('en-US', options);
};
