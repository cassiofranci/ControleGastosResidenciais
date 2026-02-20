import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Categoria } from "../types/models";
import "./cadastro.css";

export default function Categorias() {
  const [categorias, setCategoria] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState("");

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function carregarCategorias() {
    const response = await api.get("/categorias");
    setCategoria(response.data);
  }

  async function adicionarCategoria() {
    await api.post("/categorias", {
      descricao,
      finalidade,
    });

    setDescricao("");
    setFinalidade("");
    carregarCategorias();
  }

  async function deletarCategoria(id: number) {
    await api.delete(`/categoria/${id}`);
    carregarCategorias();
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Cadastro de Categoria</h1>

        <div className="form">
          <input
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <input
            type="Finalidade"
            value={finalidade}
            onChange={(e) => setFinalidade(e.target.value)}
          />

          <button onClick={adicionarCategoria}>Adicionar</button>
        </div>

        <ul className="lista">
          {categorias.map((c) => (
            <li key={c.id}>
              <span>
                {c.descricao} -{" "}                
              </span>
              <button
                className="Delete"
                onClick={() => deletarCategoria(c.id)}
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