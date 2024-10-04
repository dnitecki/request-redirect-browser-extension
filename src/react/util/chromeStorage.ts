import { StorageObject } from "../../types/types";

/**
 * Sets a value in Chrome's synchronized storage under a specified key.
 *
 * @param key - The key under which to store the value.
 * @param value - The StorageObject to be stored.
 */
export const setToChromeStorage = (key: string, value: StorageObject) => {
  chrome.storage.sync.set({ [key]: value });
};

/**
 * Retrieves values from Chrome's synchronized storage for the specified keys.
 *
 * @param keys - An array of keys to retrieve values for.
 *               If null, retrieves all items in storage.
 * @returns A Promise that resolves to an array of StorageObject values.
 */
export const getFromChromeStorage = (keys: string[] | null) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res) => {
      const valuesArray = Object.values(res);
      resolve(valuesArray);
    });
  });
};

/**
 * Removes a specified key and its associated value from Chrome's synchronized storage.
 *
 * @param key - The key of the item to be removed.
 */
export const removeFromChromeStorage = (key: string) => {
  chrome.storage.sync.remove(key);
};

/**
 * Clears all items from Chrome's synchronized storage.
 *
 * @returns A Promise that resolves once all items have been cleared.
 */
export const clearAllChromeStorage = async () => {
  await chrome.storage.sync.clear();
};
