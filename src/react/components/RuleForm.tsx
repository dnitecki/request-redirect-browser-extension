import { useState } from "react";
import { EMPTY_STRING } from "../constants/constants";
import "./RuleForm.scss";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { StorageObject } from "../types/types";
import { setToChromeStorage } from "../util/chromeStorage";

const RuleForm: React.FC<{
  initialState?: StorageObject;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ initialState, setIsEditing }) => {
  const formInitialState: StorageObject = {
    ruleName: EMPTY_STRING,
    fromUrl: EMPTY_STRING,
    toUrl: EMPTY_STRING,
    enabled: false,
  };
  const [formData, setFormData] = useState(initialState ?? formInitialState);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const setRule = (e: any) => {
    e.preventDefault();
    setToChromeStorage(formData.ruleName, formData);
    if (!initialState) {
      setFormData(formInitialState);
    }
  };

  const FormSubmitButtons = (): JSX.Element => {
    return (
      <>
        {initialState ? (
          <>
            <div className="form-row">
              <button className="form-submit" onClick={handleCancel}>
                <p>Cancel</p>
                <CloseIcon fontSize="medium" />
              </button>
              <button type="submit" className="form-submit">
                <p>Edit Rule</p>
                <CheckIcon fontSize="medium" />
              </button>
            </div>
          </>
        ) : (
          <button type="submit" className="form-submit">
            <p>Add Rule</p>
            <AddIcon fontSize="medium" />
          </button>
        )}
      </>
    );
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
        disabled={initialState ? true : false}
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
      <FormSubmitButtons />
    </form>
  );
};

export default RuleForm;
