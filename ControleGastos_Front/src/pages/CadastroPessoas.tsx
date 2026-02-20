import { useState } from "react";
import { api } from "../api/axios";

export default function CadastroPessoa() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  async function salvar() {
    await api.post("/pessoas", {
      nome,
      dataNascimento,
    });

    alert("Pessoa cadastrada com sucesso!");
    setNome("");
    setDataNascimento("");
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Cadastro de Pessoa</h4>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="mb-3 col-md-2">
            <label className="form-label">Data de Nascimento</label>
            <input
              type="date"
              className="form-control"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
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
