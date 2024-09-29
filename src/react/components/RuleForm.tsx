import { useEffect, useRef, useState } from "react";
import { EMPTY_STRING } from "../constants/constants";
import "./RuleForm.scss";
import AddIcon from "@mui/icons-material/Add";
import { StorageObject } from "../types/types";
import {
  getFormChromeStorage,
  setToChromeStorage,
} from "../util/chromeStorage";

const formInitialState: StorageObject = {
  fromUrl: EMPTY_STRING,
  toUrl: EMPTY_STRING,
  enabled: false,
};

const ruleForm = useRef();
const [formData, setFormData] = useState(formInitialState);

const handleChange = (e: any) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
};

const setRule = (e: any) => {
  e.preventDefault();
  setToChromeStorage("rule", formData);
  setFormData(formInitialState);
};

useEffect(() => {
  getFormChromeStorage([]);
});
const RuleForm = () => {
  return (
    <form
      ref={ruleForm}
      onSubmit={setRule}
      id="ruleForm"
      className="rule-form-container"
    >
      <label htmlFor="fromUrl" className="form-label">
        From URL:
      </label>
      <input
        type="text"
        id="fromUrl"
        className="form-input"
        placeholder="https://example.com"
        value={formData.fromUrl}
        onChange={handleChange}
      />
      <label htmlFor="toUrl" className="form-label">
        To URL:
      </label>
      <input
        type="text"
        id="toUrl"
        className="form-input"
        placeholder="https://new-url.com"
        value={formData.toUrl}
        onChange={handleChange}
      />
      <button type="submit" className="form-submit">
        <p>Add Rule</p>
        <AddIcon fontSize="medium" />
      </button>
    </form>
  );
};

export default RuleForm;
