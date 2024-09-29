import { useState } from "react";
import { EMPTY_STRING } from "../constants/constants";
import "./RuleForm.scss";
import AddIcon from "@mui/icons-material/Add";
import { StorageObject } from "../types/types";
import { setToChromeStorage } from "../util/chromeStorage";

const RuleForm = () => {
  const formInitialState: StorageObject = {
    ruleName: EMPTY_STRING,
    fromUrl: EMPTY_STRING,
    toUrl: EMPTY_STRING,
    enabled: false,
  };
  const [formData, setFormData] = useState(formInitialState);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const setRule = (e: any) => {
    e.preventDefault();
    setToChromeStorage(formData.ruleName, formData);
    setFormData(formInitialState);
  };

  return (
    <form onSubmit={setRule} id="ruleForm" className="rule-form-container">
      <label htmlFor="fromUrl" className="form-label">
        Rule Name
      </label>
      <input
        type="text"
        id="ruleName"
        name="ruleName"
        className="form-input"
        placeholder="Rule123"
        value={formData.ruleName}
        onChange={handleChange}
        required
      />
      <label htmlFor="fromUrl" className="form-label">
        From URL:
      </label>
      <input
        type="text"
        id="fromUrl"
        name="fromUrl"
        className="form-input"
        placeholder="https://example.com"
        value={formData.fromUrl}
        onChange={handleChange}
        required
      />
      <label htmlFor="toUrl" className="form-label">
        To URL:
      </label>
      <input
        type="text"
        id="toUrl"
        name="toUrl"
        className="form-input"
        placeholder="https://new-url.com"
        value={formData.toUrl}
        onChange={handleChange}
        required
      />
      <button type="submit" className="form-submit">
        <p>Add Rule</p>
        <AddIcon fontSize="medium" />
      </button>
    </form>
  );
};

export default RuleForm;
