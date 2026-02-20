import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import type { Pessoa } from "../../types/models";
import CadastroPessoa from "./CadastroPessoas";

//Nessa tela utilizei as funcoes sendo executadas pelo pai

export default function ConsultaPessoa() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);  
  const [showCadastro, setShowCadastro] = useState(false);
  const [pessoa, setPessoa] = useState({
    id: 0,
    nome: "",
    dataNascimento: ""
  });

  useEffect(() => {
    carregar();
  }, []);
  //Consumo das APIS para as funções da tela
  async function carregar() {
    try {
      const response = await api.get("/Pessoa");
      setPessoas(response.data);
    } catch{    
    }
  }

  async function excluir(id: number) {
    const confirmar = window.confirm("Tem certeza que deseja excluir?");
    if (!confirmar) return;

    try {
      await api.delete(`/Pessoa/${id}`);
      carregar();
    } catch{    
    }
  }  
  
  async function salvar() {
  try {
      if (pessoa.id === 0) {
        // Criar
        await api.post("/Pessoa", pessoa);
      } else {
        // Editar
        await api.put(`/Pessoa/${pessoa.id}`, pessoa);
      }

      setShowCadastro(false);
      setPessoa({ id: 0, nome: "", dataNascimento: "" });
      carregar();
  } catch (err) {
    console.error(err);
  }
  }

  function abrirEdicao(p: Pessoa) {
    setPessoa({
      id: p.id,
      nome: p.nome,
      //realizado o split para carregar na edicao a data de nascimento
      dataNascimento: p.dataNascimento.split("T")[0]
    });

    setShowCadastro(true);
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white">
          <h4>Pessoas</h4>
          {/* Botao para adicionar item */}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setPessoa({
                id: 0,
                nome: "",
                dataNascimento: ""
              });
              setShowCadastro(true);
            }}
          >
            Adicionar
          </button>
        </div>
     
        {/* Estrutura da tabela para exibição dos campos */}
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>
                    {new Date(p.dataNascimento).toLocaleDateString()}
                  </td>
                  <td>
                   <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => abrirEdicao(p)}>
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => excluir(p.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Criado um modal para exibir o cadastro de pessoa utilizado na criacao e edicao */}
          {showCadastro && (
              <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header bg-secondary text-white">
                      <h5 className="modal-title">
                        {pessoa.id === 0 ? "Adicionar Pessoa" : "Editar Pessoa"}
                      </h5>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() => setShowCadastro(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <CadastroPessoa
                          pessoa={pessoa}
                          setPessoa={setPessoa}
                          salvar={salvar}
                        />
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
