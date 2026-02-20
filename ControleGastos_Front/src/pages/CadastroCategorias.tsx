import { useState } from "react";
import { api } from "../api/axios";

export default function CadastroCategoria() {
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState("");

  async function salvar() {
    await api.post("/categorias", {
      descricao,
      finalidade,
    });

    alert("Categoria cadastrada com sucesso!");
    setDescricao("");
    setFinalidade("");
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Cadastro de Categoria</h4>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Descrição</label>
            <input
              type="text"
              className="form-control"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="mb-3 col-md-5">
            <label className="form-label">Finalidade</label>
            <input
              type="text"
              className="form-control"
              value={finalidade}
              onChange={(e) => setFinalidade(e.target.value)}
            />
          </div>

          <button className="btn btn-success" onClick={salvar}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
