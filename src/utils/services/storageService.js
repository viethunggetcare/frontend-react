export const getLocalStorage = (name) => {
  const result = window.localStorage.getItem(name);
  try {
    return JSON.parse(result);
  } catch (error) {}
  return result;
};

export const setLocalStorage = (name, value) => {
  try {
    window.localStorage.setItem(name, JSON.stringify(value));
  } catch (error) {
    window.localStorage.setItem(name, value);
  }
};

export const removeLocalStorage = (name) => {
  window.localStorage.removeItem(name);
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};

export const getSessionStorage = (name) => {
  const result = window.sessionStorage.getItem(name);
  try {
    return JSON.parse(result);
  } catch (error) {}
  return result;
};

export const setSessionStorage = (name, value) => {
  try {
    window.sessionStorage.setItem(name, JSON.stringify(value));
  } catch (error) {
    window.sessionStorage.setItem(name, value);
  }
};

export const removeSessionStorage = (name) => {
  window.sessionStorage.removeItem(name);
};

export const clearSessionStorage = () => {
  window.sessionStorage.clear();
};
