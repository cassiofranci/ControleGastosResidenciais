export default function Home() {
  return (
    <div className="d-flex flex-column h-100">
  
      <div className="flex-fill">
        <h1>Bem-vindo ao Sistema de Controle de Gastos</h1>
        <p>Selecione uma opção no menu.</p>
      </div>

      <footer className="text-center py-3 mt-auto">
        <small>
          © {new Date().getFullYear()} - Desenvolvido por <strong>Cássio Franci</strong><br />
           cassio.franci@outlook.com<br />
           <a 
              href="https://github.com/cassiofranci"
              target="_blank"
              rel="noopener noreferrer"                
            >
              github.com/cassiofranci
            </a>
        </small>
      </footer>

  </div>
  );
}
