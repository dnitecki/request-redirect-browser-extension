import { useEffect, useState } from "react";
import "./RuleList.scss";
import {
  getFromChromeStorage,
  removeFromChromeStorage,
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
    setRule(ruleName);
    setIsEditing(true);
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
        <>
          <li key={item.ruleName} className="rule-list-item">
            <p>{item.ruleName}</p>
            <div className="rule-list-options">
              <button onClick={() => handleEdit(item.ruleName)}>
                <EditIcon fontSize="medium" />
              </button>
              <button onClick={() => handleDelete(item.ruleName)}>
                <DeleteIcon fontSize="medium" />
              </button>
            </div>
          </li>
          <div className="rule-list-edit">
            {isEditing && rule === item.ruleName && (
              <RuleForm
                initialState={{
                  ruleName: item.ruleName,
                  fromUrl: item.fromUrl,
                  toUrl: item.toUrl,
                  enabled: false,
                }}
                setIsEditing={setIsEditing}
              />
            )}
          </div>
        </>
      ))}
    </ul>
  );
};

export default RuleList;
