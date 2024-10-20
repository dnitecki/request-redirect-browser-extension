import "./App.scss";
import Header from "./Header";
import RuleForm from "./RuleForm";
import RuleList from "./RuleList";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="app-container">
      <section className="header">
        <Header />
      </section>
      <section className="main">
        <RuleForm />
        <div className="heading-text">
          <h1>Rules</h1>
        </div>
        <RuleList />
      </section>
      <section className="footer">
        <Footer />
      </section>
    </div>
  );
}
