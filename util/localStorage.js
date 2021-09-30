export function getLocalStorage(key) {
  try {
    return JSON.parse(window.localStorage[key]);
  } catch (err) {
    return undefined;
  }
}

export function setLocalStorage(key, value) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
