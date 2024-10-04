import "./App.scss";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RuleForm from "./RuleForm";
import RuleList from "./RuleList";
import { version } from "../../../public/manifest.json";

export default function App() {
  return (
    <div className="app-container">
      <section className="header">
        <div className="title">
          <h1>
            <span>re</span>Route
          </h1>
          <RepeatIcon className="main-icon" fontSize="large" />
        </div>
      </section>
      <section className="main">
        <RuleForm />
        <div className="title">
          <h1>Rules</h1>
        </div>
        <RuleList />
      </section>
      <section className="footer">
        <div className="version">
          <p>v{version}</p>
          <a
            href="https://github.com/dnitecki/request-redirect-browser-extension"
            target="_blank"
            rel="noreferrer"
          >
            <p>GitHub</p>
          </a>
        </div>
        <div className="footer-text">
          <p>Made with&nbsp;</p>
          <FavoriteIcon fontSize="small" />
          <p>
            &nbsp;by&nbsp;
            <a
              href="https://www.linkedin.com/in/dnitecki/"
              target="_blank"
              rel="noreferrer"
            >
              Dominick Nitecki
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
