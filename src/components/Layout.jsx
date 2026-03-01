import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }) {
  const location = useLocation();
  const showFooter = location.pathname !== "/";

  return (
    <div className="app-shell">
      <Navbar />
      <main className={`page-main ${location.pathname === "/" ? "home-main" : ""}`}>
        {children}
      </main>
      {showFooter ? <Footer /> : null}
    </div>
  );
}

export default Layout;
