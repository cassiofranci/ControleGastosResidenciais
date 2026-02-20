import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Pessoa } from "../types/models";
import "./Pessoas.css";

export default function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  useEffect(() => {
    carregarPessoas();
  }, []);

  async function carregarPessoas() {
    const response = await api.get("/pessoas");
    setPessoas(response.data);
  }

  async function adicionarPessoa() {
    await api.post("/pessoas", {
      nome,
      dataNascimento,
    });

    setNome("");
    setDataNascimento("");
    carregarPessoas();
  }

  async function deletarPessoa(id: number) {
    await api.delete(`/pessoas/${id}`);
    carregarPessoas();
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Cadastro de Pessoas</h1>

        <div className="form">
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />

          <button onClick={adicionarPessoa}>Adicionar</button>
        </div>

        <ul className="lista">
          {pessoas.map((p) => (
            <li key={p.id}>
              <span>
                {p.nome} -{" "}
                {new Date(p.dataNascimento).toLocaleDateString()}
              </span>
              <button
                className="delete"
                onClick={() => deletarPessoa(p.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}