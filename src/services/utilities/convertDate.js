export const convertDate = (date) => {
  return date.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
};
