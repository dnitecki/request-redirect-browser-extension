import { useState } from "react";
import { EMPTY_STRING } from "../constants/constants";
import "./RuleForm.scss";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { StorageObject } from "../types/types";
import { setToChromeStorage } from "../util/chromeStorage";
import { RuleOperatorEnum } from "../enums/enums";

const RuleForm: React.FC<{
  initialState?: StorageObject;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ initialState, setIsEditing }) => {
  const formInitialState: StorageObject = {
    ruleName: EMPTY_STRING,
    ruleOperator: RuleOperatorEnum.EQUALS,
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
              <button
                className="form-submit"
                onClick={handleCancel}
                title="Cancel"
              >
                <CloseIcon fontSize="small" />
                <p>Cancel</p>
              </button>
              <button type="submit" className="form-submit" title="Update Rule">
                <CheckIcon fontSize="small" />
                <p>Update</p>
              </button>
            </div>
          </>
        ) : (
          <div className="form-row">
            <button type="submit" className="form-submit" title="Add Rule">
              <AddIcon fontSize="small" />
              <p>Add Rule</p>
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <form onSubmit={setRule} id="ruleForm" className="rule-form-container">
      {!initialState && (
        <>
          <label htmlFor="fromUrl" className="form-label">
            Rule Name
          </label>
          <input
            type="text"
            id="ruleName"
            name="ruleName"
            className="form-input"
            value={formData.ruleName}
            onChange={handleChange}
            disabled={initialState ? true : false}
            required
          />
        </>
      )}
      <label htmlFor="fromUrl" className="form-label">
        If URL
      </label>
      <div className="form-selct-input-row">
        <select
          className="form-select"
          id="ruleOperator"
          name="ruleOperator"
          required
          onChange={handleChange}
          value={formData.ruleOperator}
        >
          <option value={RuleOperatorEnum.EQUALS}>Equals</option>
          <option value={RuleOperatorEnum.CONTAINS}>Contains</option>
        </select>
        <input
          type="text"
          id="fromUrl"
          name="fromUrl"
          className="form-input-with-select"
          value={formData.fromUrl}
          onChange={handleChange}
          required
        />
      </div>
      <label htmlFor="toUrl" className="form-label">
        Redirect to
      </label>
      <input
        type="text"
        id="toUrl"
        name="toUrl"
        className="form-input"
        value={formData.toUrl}
        onChange={handleChange}
        required
      />
      <FormSubmitButtons />
    </form>
  );
};

export default RuleForm;
