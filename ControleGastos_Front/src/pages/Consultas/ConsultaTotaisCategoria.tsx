import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import type { TotaisPorCategoria } from "../../types/models";

export default function ConsultaTotaisCategoria() {
  const [dados, setDados] = useState<TotaisPorCategoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setLoading(true);
    setErro(null);
    try {
      const response = await api.get("/Consulta/TotaisPorCategoria");
      setDados(response.data);
    } catch {      
    } finally {
      setLoading(false);
    }
  }
    //transformando o array em um unico valor
    const totalReceitas = dados.reduce((totalAcumulado, categoria) => totalAcumulado + categoria.totalReceitas, 0);
    const totalDespesas = dados.reduce((totalAcumulado, categoria) => totalAcumulado + categoria.totalDespesas, 0); 
    const saldoGeral = totalReceitas - totalDespesas;

  return (
    <div className="container mt-4">
        <div className="card shadow">
            <div className="card-header bg-secondary text-white">
            <h4>Totais por Categoria</h4>
            </div>

            <div className="card-body">

            {loading && <div>Carregando...</div>}
            {erro && <div className="text-danger">{erro}</div>}

            {!loading && !erro && (
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                <tr>
                    <th>Pessoa</th>
                    <th>Total Receitas</th>
                    <th>Total Despesas</th>
                    <th>Saldo</th>
                </tr>
                </thead>

                <tbody>
                    {/*total por Categoria */}
                {dados.map((d) => (
                    <tr key={d.categoriaId}>
                    <td>{d.categoriaDescricao}</td>
                    <td className="text-success">
                        {d.totalReceitas.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                        })}
                    </td>
                    <td className="text-danger">
                        {d.totalDespesas.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                        })}
                    </td>
                    <td className={d.saldo >= 0 ? "text-primary" : "text-danger"}>
                        {d.saldo.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                        })}
                    </td>
                    </tr>
                ))}

                {/*total geral */}
                <tr className="table-secondary fw-bold">
                    <td>Total Geral</td>
                    <td className="text-success">
                    {totalReceitas.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                    </td>
                    <td className="text-danger">
                    {totalDespesas.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                    </td>
                    <td className={saldoGeral >= 0 ? "text-primary" : "text-danger"}>
                    {saldoGeral.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                    </td>
                </tr>

                </tbody>
            </table>
            )}
            </div>
        </div>
    </div>
  );
}