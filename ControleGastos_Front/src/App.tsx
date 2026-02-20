import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CadastroPessoa from "./pages/pessoas/CadastroPessoas";
import Pessoa from "./pages/pessoas/Pessoas";
import Transacao from "./pages/transacoes/Transacao";
import Categoria from "./pages/categorias/Categoria";
import CadastroCategoria from "./pages/categorias/CadastroCategorias";
import CadastroTransacoes from "./pages/transacoes/CadastroTransacoes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Cadastro
          <Route path="cadastro/pessoas" element={<CadastroPessoa/>} />
          <Route path="cadastro/categorias" element={<CadastroCategoria/>} />
          <Route path="cadastro/transacoes" element={<CadastroTransacoes/>} /> */}

          {/* Itens principais */}
          <Route path="pessoas" element={<Pessoa />} />
          <Route path="categorias" element={<Categoria />} />
          <Route path="transacoes" element={<Transacao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
