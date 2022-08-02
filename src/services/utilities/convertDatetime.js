export const convertDatetime = (datetime) => {
  return datetime.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour12: 'false',
  });
};
