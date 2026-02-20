import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Layout.css";

export default function Layout() { 
  const [openConsultas, setOpenConsultas] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="layout">      
      <nav className="menu">
        
        {/*  Retirei o modo escuro pois usei provisoriamente para testes
        <div>
              <button              
                  className="theme-btn btn btn-secondary"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  Tema
                  {darkMode ? " Claro" : " Escuro"}
               </button>
        </div> */}

        <h2>Controle de Gastos</h2>

        <Link to="/">Home</Link>   
       
        <Link to="/pessoas">Pessoas</Link>
        <Link to="/categorias">Categorias</Link>
        <Link to="/transacoes">Transações</Link>
        
    
        {/* Consultas */}
        <div>
          <button
            className="submenu-btn"
            onClick={() => setOpenConsultas(!openConsultas)}
          >
            Consultas
          </button>

          {openConsultas && (
            <div className="submenu">
              <Link to="/TotaisPorPessoa">Por Pessoa</Link>
              <Link to="/TotaisPorCategoria">Por Categorias</Link>              
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
