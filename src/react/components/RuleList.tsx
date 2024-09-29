import { useEffect, useState } from "react";
import "./RuleList.scss";
import {
  getFromChromeStorage,
  removeFromChromeStorage,
} from "../util/chromeStorage";
import { StorageObject } from "../types/types";
import DeleteIcon from "@mui/icons-material/Delete";

const RuleList = () => {
  const [ruleList, setRuleList] = useState(null);
  const getRuleList = async () => {
    const list = await getFromChromeStorage(null);
    setRuleList(list);
  };
  const handleStorageChange = async () => {
    const list = await getFromChromeStorage(null);
    setRuleList(list);
  };
  const handleDelete = async (key: string) => {
    removeFromChromeStorage(key);
  };
  useEffect(() => {
    getRuleList();
  }, []);
  useEffect(() => {
    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  });

  return (
    <ul className="rule-list-container">
      {ruleList?.map((item: StorageObject) => (
        <li key={item.ruleName} className="rule-list-item">
          <p>{item.ruleName}</p>
          <div className="rule-list-options">
            <DeleteIcon
              fontSize="medium"
              onClick={() => handleDelete(item.ruleName)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RuleList;
