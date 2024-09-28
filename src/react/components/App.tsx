import "./App.scss";
import RuleForm from "./RuleForm";
import RepeatIcon from "@mui/icons-material/Repeat";

export default function App() {
  return (
    <div className="app-container">
      <section className="header">
        <h1>Request Redirect</h1>
        <RepeatIcon fontSize="large" />
      </section>
      <section className="main">
        <RuleForm />
      </section>
    </div>
  );
}
