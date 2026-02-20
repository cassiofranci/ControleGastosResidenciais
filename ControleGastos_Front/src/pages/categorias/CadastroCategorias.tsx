import { useState } from "react";
import { api } from "../../api/axios";

export default function CadastroCategoria() {
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState("");

  async function salvar() {
  try {    
    await api.post("/Categoria", {
      descricao,
      finalidade,
    });

    alert("Categoria cadastrada com sucesso!");
    setDescricao("");
    setFinalidade("");

    } 
    catch {     
    }
  }

  return (
    <div className="card-body">
      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <input              
          className="form-control"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
      {/* utilizado o droplist para evitar erros de digitação e por ter valores predefinidos */}
      <div className="mb-3 col-md-3">
        <label className="form-label">Finalidade</label>
        <select
          className="form-select"
          value={finalidade}
          onChange={(e) => setFinalidade(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="Receita">Receita</option>
          <option value="Despesa">Despesa</option>
        </select>
      </div>

      <button className="btn btn-success" onClick={salvar}>
        Salvar
      </button>
    </div>   
  );
}
