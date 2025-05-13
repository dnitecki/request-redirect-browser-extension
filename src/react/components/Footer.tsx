import FavoriteIcon from "@mui/icons-material/Favorite";
import { version } from "../../../public/manifest.json";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
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
            Dominick Nitecki & Tyler McRill
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
