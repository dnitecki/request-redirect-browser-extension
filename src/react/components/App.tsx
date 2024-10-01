import "./App.scss";
import RuleForm from "./RuleForm";
import RepeatIcon from "@mui/icons-material/Repeat";
import RuleList from "./RuleList";
import { version } from "../../../package.json";

export default function App() {
  return (
    <div className="app-container">
      <section className="header">
        <div className="title">
          <h1>ReRoute</h1>
          <RepeatIcon fontSize="large" />
        </div>
        <div className="version">
          <p>v{version}</p>
        </div>
      </section>
      <section className="main">
        <RuleForm />
        <div className="title">
          <h1>Rules</h1>
        </div>
        <RuleList />
      </section>
    </div>
  );
}
