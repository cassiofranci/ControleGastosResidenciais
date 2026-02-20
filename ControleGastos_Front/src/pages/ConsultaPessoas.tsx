import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Pessoa } from "../types/models";

export default function ConsultaPessoa() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const response = await api.get("/pessoas");
    setPessoas(response.data);
  }

  async function excluir(id: number) {
    await api.delete(`/pessoas/${id}`);
    carregar();
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          <h4>Consulta de Pessoas</h4>
        </div>

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
        </div>
      </div>
    </div>
  );
}
