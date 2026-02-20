import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Layout.css";

export default function Layout() {
  const [openCadastro, setOpenCadastro] = useState(false);
  const [openConsulta, setOpenConsulta] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="layout">      
      <nav className="menu">
        <div>
              <button              
                  className="theme-btn btn btn-secondary"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  Tema
                  {darkMode ? " Claro" : " Escuro"}
               </button>
        </div>
        
        <h2>Controle de Gastos</h2>

        <Link to="/">Home</Link>

        {/* Cadastro */}
        <div>
          <button
            className="submenu-btn"
            onClick={() => setOpenCadastro(!openCadastro)}
          >
            Cadastro
          </button>

          {openCadastro && (
            <div className="submenu">
              <Link to="/cadastro/pessoas">Pessoas</Link>
              <Link to="/cadastro/categorias">Categorias</Link>
              <Link to="/cadastro/transacoes">Transações</Link>
            </div>
          )}
        </div>

        {/* Consulta */}
        <div>
          <button
            className="submenu-btn"
            onClick={() => setOpenConsulta(!openConsulta)}
          >
            Consulta
          </button>

          {openConsulta && (
            <div className="submenu">
              <Link to="/consulta/pessoas">Pessoas</Link>
              <Link to="/consulta/categorias">Categorias</Link>
              <Link to="/consulta/transacoes">Transações</Link>
            </div>
          )}
        </div>
      </nav>

 <main className="content">  
        <Outlet />
      </main>
    </div>
  );
}
