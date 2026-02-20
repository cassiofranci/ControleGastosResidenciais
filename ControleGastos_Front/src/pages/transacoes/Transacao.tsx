import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import type { TransacaoRetorno } from "../../types/models";  
import CadastroTransacoes from "./CadastroTransacoes";

//Nessa tela utilizei as funcoes sendo executadas pelo filho e retornando os valores atualizados

export default function ConsultaTransacao() {
  const [transacoes, setTransacoes] = useState<TransacaoRetorno[]>([]);  
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [showCadastro, setShowCadastro] = useState(false);

  useEffect(() => {
  carregar();  
  }, []);
  async function carregar() {
    //incluindo um loading
    setLoading(true);
    setErro(null);
    try {    
      //Consumo das APIS para as funções da tela
      const response = await api.get("/Transacao");
      setTransacoes(response.data);
    } catch{    
      setErro("Erro ao carregar transações.")
    }
    finally {
        setLoading(false);
    }
  }
  //fechando o modal e atualizando a grid com os valores atualizados
  function fecharModal() {
    setShowCadastro(false);
    carregar();
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
       <div className="card-header d-flex justify-content-between align-items-center bg-secondary text-white">
          <h4>Transações</h4>
          {/* Botao para adicionar item */}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowCadastro(true)}
          >
            Adicionar
          </button>
        </div>

        <div className="card-body">
          {loading && <div>Carregando transações...</div>}
          {erro && <div className="text-danger">{erro}</div>}

          {!loading && !erro && (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Pessoa</th>
                  <th>Categoria</th>
                  <th>Finalidade</th>  
                  <th>Data</th>
                  <th>Valor</th>   
                </tr>
              </thead>
              <tbody>
                {transacoes.map((t) => (
                  <tr key={t.id}>
                    <td>{t.descricao}</td>
                    <td>{t.pessoaNome}</td> 
                    <td>{t.categoriaDescricao}</td>
                    <td>{t.categoriaFinalidade}</td>
                    <td>{new Date(t.data).toLocaleDateString()}</td>
                    <td>
                      {Number(t.valor).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>            
          )}
           {!loading && !erro && transacoes.length === 0 && (
            <div>Nenhuma transação encontrada.</div>
          )}
          {/* Criado um modal para exibir o cadastro de pessoa */}
            {showCadastro && (
                <div className="modal show d-block" tabIndex={-1}>
                  <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                      <div className="modal-header bg-secondary text-white">
                        <h5 className="modal-title">Adicionar Transacao</h5>
                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          onClick={() => setShowCadastro(false)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <CadastroTransacoes onSucesso={fecharModal} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}
