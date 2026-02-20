import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Transacao } from "../types/models";
import "./cadastro.css";

export default function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pessoaId, setPessoaId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    carregarTransacoes();
  }, []);

  async function carregarTransacoes() {
    const response = await api.get("/transacoes");
    setTransacoes(response.data);
  }

  async function adicionarTransacoes() {
    await api.post("/transacoes", {
      valor,
      data,
      descricao,
      pessoaId,
      categoriaId
    });

    setValor("");
    setData("");
    setDescricao("");
    setPessoaId("");
    setCategoriaId("");
    carregarTransacoes();
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Cadastro de Transações</h1>

        <div className="form">
          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <input            
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <input         
            value={pessoaId}
            onChange={(e) => setPessoaId(e.target.value)}
          />
          <input        
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          />

          <button onClick={adicionarTransacoes}>Adicionar</button>
        </div>

        <ul className="lista">
          {transacoes.map((t) => (
            <li key={t.id}>
              <span>
                {t.data} -{" "}
                {new Date(t.data).toLocaleDateString()}
              </span>            
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}