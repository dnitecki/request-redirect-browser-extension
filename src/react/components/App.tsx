import "./App.scss";
import Header from "./Header";
import RuleForm from "./RuleForm";
import RuleList from "./RuleList";
import Footer from "./Footer";

export const App = () => {
  return (
    <div className="app-container">
      <section className="header">
        <Header />
      </section>
      <section className="main">
        <RuleForm />
        <RuleList />
      </section>
      <section className="footer">
        <Footer />
      </section>
    </div>
  );
};
export default App;
