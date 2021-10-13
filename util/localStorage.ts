export function getLocalStorage(key: string) {
  try {
    return JSON.parse(window.localStorage[key]);
  } catch (err) {
    return undefined;
  }
}

export function setLocalStorage(
  key: string,
  // If you wanted to allow for a string or a number
  // key: string | number,
  value: boolean,
) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
