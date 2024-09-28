import "./RuleForm.scss";
import AddIcon from "@mui/icons-material/Add";

const RuleForm = () => {
  return (
    <form id="ruleForm" className="rule-form-container">
      <label htmlFor="fromUrl" className="form-label">
        From URL:
      </label>
      <input
        type="text"
        id="fromUrl"
        className="form-input"
        placeholder="https://example.com"
      />
      <label htmlFor="toUrl" className="form-label">
        To URL:
      </label>
      <input
        type="text"
        id="toUrl"
        className="form-input"
        placeholder="https://new-url.com"
      />
      <button type="submit" className="form-submit">
        <p>Add Rule</p>
        <AddIcon fontSize="medium" />
      </button>
    </form>
  );
};

export default RuleForm;
