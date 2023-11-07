import InvestmentPanel from "./InvestmentPanel/InvestmentPanel";
import "./styles.css";
import UserSelection from "./UserSelection/UserSelection";

function App() {
  return (
    <div className="App">
      <UserSelection />
      <InvestmentPanel />
    </div>
  );
}

export default App;
