import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import type { Categoria } from "../../types/models";
import CadastroCategoria from "./CadastroCategorias";

export default function ConsultaPessoa() {
  const [categorias, setCategoria] = useState<Categoria[]>([]);
  const [showCadastro, setShowCadastro] = useState(false);

  useEffect(() => {
    carregar();
  }, []);
  //Consumo das APIS para as funções da tela
  async function carregar() {
    const response = await api.get("/Categoria");
    setCategoria(response.data);
  }

  async function excluir(id: number) {
    await api.delete(`/Categoria/${id}`);
    carregar();
  }
   
  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white">
          <h4>Categorias</h4>
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
                <th>Descrição</th>
                <th>Finalidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id}>
                  <td>{c.descricao}</td>
                  <td>{c.finalidade}</td>                  
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => excluir(c.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Criado um modal para exibir o cadastro de categoria */}
          {showCadastro && (
              <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header bg-secondary text-white">
                      <h5 className="modal-title">Adicionar Categoria</h5>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() => setShowCadastro(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <CadastroCategoria />
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
