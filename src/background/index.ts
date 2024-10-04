import { getFromChromeStorage } from "../react/util/chromeStorage";

const getRuleList = async () => {
  const list = await getFromChromeStorage(null);
  console.log("background", list);
  return list;
};

chrome.storage.onChanged.addListener(() => {
  getRuleList();
});
chrome.runtime.onStartup.addListener(() => {
  getRuleList();
});
