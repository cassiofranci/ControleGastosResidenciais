import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CadastroPessoa from "./pages/CadastroPessoas";
import ConsultaPessoa from "./pages/ConsultaPessoas";
import CadastroCategoria from "./pages/CadastroCategorias";
import CadastroTransacoes from "./pages/CadastroTransacoes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Cadastro */}
          <Route path="cadastro/pessoas" element={<CadastroPessoa />} />
          <Route path="cadastro/categorias" element={<CadastroCategoria/>} />
          <Route path="cadastro/transacoes" element={<CadastroTransacoes/>} />

          {/* Consulta */}
          <Route path="consulta/pessoas" element={<ConsultaPessoa />} />
          <Route path="consulta/categorias" element={<div>Consultar Categoria</div>} />
          <Route path="consulta/transacoes" element={<div>Consultar Transação</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
