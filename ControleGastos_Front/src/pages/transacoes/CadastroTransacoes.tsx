import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../api/axios";

export default function CadastroTransacoes() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [pessoaId, setPessoaId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [pessoas, setPessoas] = useState<{ id: number; nome: string }[]>([]);
  const [categorias, setCategorias] = useState<{ id: number; descricao: string }[]>([]);



  useEffect(() => {
    carregarPessoas();
    carregarCategorias();
  }, []);

  async function carregarPessoas() {
    try {
      const res = await api.get("/Pessoa");
      setPessoas(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar pessoas");
    }
  }

  async function carregarCategorias() {
    try {
      const res = await api.get("/Categoria");
      setCategorias(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar categorias");
    }
  }
  async function salvar() {
    try {
      await api.post("/Transacao", {
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
    catch {
    }
  }

  return (   
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

      <div className="mb-3 col-md-3">
        <label className="form-label">Valor</label>
        <input
          type="number"
          className="form-control"
          step="0.01"
          min="0"
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
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      <div className="mb-3 col-md-6">
        <label className="form-label">Pessoa</label>
        <select
          className="form-select"
          value={pessoaId}
          onChange={(e) => setPessoaId(e.target.value)}
        >
          <option value="">Selecione...</option>
          {pessoas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3 col-md-3">
        <label className="form-label">Categoria</label>
        <select
          className="form-select"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
        >
          <option value="">Selecione...</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.descricao}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-success" onClick={salvar}>
        Salvar
      </button>
    </div>
  
  );
}
