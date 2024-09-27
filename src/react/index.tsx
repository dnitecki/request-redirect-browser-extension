import ReactDOM from "react-dom/client";
import "./styles.scss";
import App from "./components/App";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(<App />);
