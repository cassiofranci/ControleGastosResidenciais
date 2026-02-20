import { useState } from "react";
import { api } from "../api/axios";

export default function CadastroTransacoes() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [pessoaId, setPessoaId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");


  async function salvar() {
    await api.post("/pessoas", {
      descricao,
      valor,
      data,
      pessoaId,
      categoriaId
    });

    alert("Transação cadastrada com sucesso!");
    setDescricao("");
    setValor("");
    setData("");
    setPessoaId("");
    setCategoriaId("");
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Cadastro de Transação</h4>
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

          <div className="mb-3 col-md-2">
            <label className="form-label">Valor</label>
            <input
              type="number"
              className="form-control"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
          
          <div className="mb-3 col-md-2">
            <label className="form-label">Data</label>
            <input
              type="date"
              className="form-control"
              value={data}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

           <div className="mb-3 col-md-2">
            <label className="form-label">Pessoa</label>
            <input
              type="number"
              className="form-control"
              value={pessoaId}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

           <div className="mb-3 col-md-2">
            <label className="form-label">Categoria</label>
            <input
              type="number"
              className="form-control"
              value={categoriaId}
              onChange={(e) => setValor(e.target.value)}
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
