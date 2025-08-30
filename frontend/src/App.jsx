import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import ClinicaPage from "./pages/ClinicaPage";
import NotFoundPage from "./pages/NotFoundPage";
import QuemSomosPage from "./pages/QuemSomosPage";
import PainelClientePage from "./pages/PainelClientePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/clinica" element={<ClinicaPage />} />
        <Route path="/painel-cliente" element={<PainelClientePage />} />        
        <Route path="/quem-somos" element={<QuemSomosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
