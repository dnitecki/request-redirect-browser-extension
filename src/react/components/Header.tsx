import "./Header.scss";
import RepeatIcon from "@mui/icons-material/Repeat";

const Header = () => {
  return (
    <div className="title">
      <h1>
        <span>re</span>Route
      </h1>
      <RepeatIcon className="main-icon" fontSize="large" />
    </div>
  );
};

export default Header;
