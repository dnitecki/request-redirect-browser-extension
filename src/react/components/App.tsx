import "./App.scss";
import RuleForm from "./RuleForm";
import RepeatIcon from "@mui/icons-material/Repeat";
import RuleList from "./RuleList";

export default function App() {
  return (
    <div className="app-container">
      <section className="header">
        <h1>ReRoute</h1>
        <RepeatIcon fontSize="large" />
      </section>
      <section className="main">
        <RuleForm />
        <div className="header">
          <h1>Rules</h1>
        </div>
        <RuleList />
      </section>
    </div>
  );
}
