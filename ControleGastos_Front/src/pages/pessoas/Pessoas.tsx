import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import type { Pessoa } from "../../types/models";
import CadastroPessoa from "./CadastroPessoas";

export default function ConsultaPessoa() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);  
  const [showCadastro, setShowCadastro] = useState(false);

  useEffect(() => {
    carregar();
  }, []);
  //Consumo das APIS para as funções da tela
  async function carregar() {
    const response = await api.get("/Pessoa");
    setPessoas(response.data);
  }

  async function excluir(id: number) {
    await api.delete(`/Pessoaa/${id}`);
    carregar();
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white">
          <h4>Pessoas</h4>
          {/* Botao para adicionar item */}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowCadastro(true)}
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
                      className="btn btn-danger btn-sm"
                      onClick={() => excluir(p.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Criado um modal para exibir o cadastro de pessoa */}
          {showCadastro && (
              <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header bg-secondary text-white">
                      <h5 className="modal-title">Adicionar Pessoa</h5>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() => setShowCadastro(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <CadastroPessoa />
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
