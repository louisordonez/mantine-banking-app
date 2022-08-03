export const assignLocalStorageItem = (key, item) => localStorage.setItem(key, JSON.stringify(item));

export const getLocalStorageItem = (key) => JSON.parse(localStorage.getItem(key));

export const removeLocalStorageItem = (key) => localStorage.removeItem(key);
