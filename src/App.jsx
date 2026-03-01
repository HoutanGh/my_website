import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ContactPage from "./pages/ContactPage";
import DoingPage from "./pages/DoingPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/doing" element={<DoingPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
