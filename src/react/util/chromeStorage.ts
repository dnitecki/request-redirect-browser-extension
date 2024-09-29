import { StorageObject } from "../types/types";

export const setToChromeStorage = (key: string, value: StorageObject) => {
  chrome.storage.sync.set({ [key]: value }, () => {
    console.log("value is set");
  });
};

export const getFormChromeStorage = (keys: string[]) => {
  chrome.storage.sync.get(keys, (res) => {
    console.log("returned", res);
  });
};
