import IdentityHeader from "./components/IdentityHeader";
import NowSection from "./components/NowSection";
import PortfolioExplorer from "./components/PortfolioExplorer";
import Quote from "./components/Quote";

function App() {
  return (
    <div className="app-shell">
      <IdentityHeader />
      <main>
        <Quote />
        <div className="page-width">
          <PortfolioExplorer />
          <NowSection />
        </div>
      </main>
    </div>
  );
}

export default App;
