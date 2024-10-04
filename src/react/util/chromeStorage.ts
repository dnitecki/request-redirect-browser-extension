import { StorageObject } from "../types/types";

export const setToChromeStorage = (key: string, value: StorageObject) => {
  chrome.storage.sync.set({ [key]: value });
};

export const getFromChromeStorage = (keys: string[] | null) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res) => {
      const valuesArray = Object.values(res);
      resolve(valuesArray);
    });
  });
};

export const removeFromChromeStorage = (key: string) => {
  chrome.storage.sync.remove(key);
};

export const clearAllChromeStorage = async () => {
  await chrome.storage.sync.clear();
};
