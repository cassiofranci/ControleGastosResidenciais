import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Pessoa from "./pages/pessoas/Pessoas";
import Transacao from "./pages/transacoes/Transacao";
import Categoria from "./pages/categorias/Categoria";
import ConsultaTotaisPessoa from "./pages/Consultas/ConsultaTotaisPessoa";
import ConsultaTotaisCategoria from "./pages/Consultas/ConsultaTotaisCategoria";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
                    
          {/* Itens principais */}
          <Route path="pessoas" element={<Pessoa />} />
          <Route path="categorias" element={<Categoria />} />
          <Route path="transacoes" element={<Transacao />} />

          {/* Itens Consulta */}
          <Route path="TotaisPorPessoa" element={<ConsultaTotaisPessoa />} />
          <Route path="TotaisPorCategoria" element={<ConsultaTotaisCategoria />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
