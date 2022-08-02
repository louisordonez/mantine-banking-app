export const convertDate = (datetime) => {
  return datetime.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};
