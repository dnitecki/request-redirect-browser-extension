import { useEffect, useState } from "react";
import "./RuleList.scss";
import {
  clearAllChromeStorage,
  getFromChromeStorage,
  removeFromChromeStorage,
  setToChromeStorage,
} from "../util/chromeStorage";
import { StorageObject } from "../types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RuleForm from "./RuleForm";

const RuleList = () => {
  const [ruleList, setRuleList] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [rule, setRule] = useState(null);
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
  const handleEdit = (ruleName: string) => {
    if (isEditing && ruleName === rule) {
      setRule(null);
      setIsEditing(false);
    } else setRule(ruleName);
    setIsEditing(true);
  };
  const handleEnable = async (item: StorageObject) => {
    const updatedItem = { ...item, enabled: !item.enabled };
    await setToChromeStorage(item.ruleName, updatedItem);
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
      {ruleList?.length === 0 && (
        <div className="form-row">
          <p>No Rules to Display</p>
        </div>
      )}
      {ruleList?.map((item: StorageObject) => (
        <>
          <li key={item.ruleName} className="rule-list-item">
            <div className="rule-list-info">
              <h2>{item.ruleName}</h2>
              <div className="rule-list-options">
                <button onClick={() => handleEdit(item.ruleName)} title="Edit">
                  <EditIcon fontSize="medium" />
                </button>
                <button
                  onClick={() => handleDelete(item.ruleName)}
                  title="Delete"
                >
                  <DeleteIcon fontSize="medium" />
                </button>
                <label className="switch" title="Enable">
                  <input
                    type="checkbox"
                    onChange={() => handleEnable(item)}
                    checked={item.enabled}
                    title="Enable"
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div className="rule-list-edit">
              {isEditing && rule === item.ruleName && (
                <RuleForm
                  initialState={{
                    ruleName: item.ruleName,
                    fromUrl: item.fromUrl,
                    toUrl: item.toUrl,
                    enabled: item.enabled,
                  }}
                  setIsEditing={setIsEditing}
                />
              )}
            </div>
          </li>
        </>
      ))}
      {ruleList?.length > 0 && (
        <div className="form-row">
          <button
            onClick={clearAllChromeStorage}
            className="form-submit"
            title="Clear All Rules"
          >
            <DeleteIcon fontSize="medium" />
            <p>Clear All Rules</p>
          </button>
        </div>
      )}
    </ul>
  );
};

export default RuleList;
