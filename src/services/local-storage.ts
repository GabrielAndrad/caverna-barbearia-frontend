const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};

const clearLocalStorage = () => {
  localStorage.clear()
}

export { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage };
