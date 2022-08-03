export const assignLocalStorageItem = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
