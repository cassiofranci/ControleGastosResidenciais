import React from "react";

//utilizado o Props para reaproveitar para edição e criação
interface CadastroPessoaProps {
  pessoa: {
    id: number;
    nome: string;
    dataNascimento: string;
  };
  setPessoa: React.Dispatch<
    React.SetStateAction<{
      id: number;
      nome: string;
      dataNascimento: string;
    }>
  >;
  salvar: () => Promise<void>;
}

export default function CadastroPessoa({
  pessoa,
  setPessoa,
  salvar
}: CadastroPessoaProps) {
  
   return (
    <div>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          className="form-control"
          value={pessoa.nome}
          onChange={(e) =>
            setPessoa({ ...pessoa, nome: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Data de Nascimento</label>
        <input
          type="date"
          className="form-control"
          value={pessoa.dataNascimento}
          onChange={(e) =>
            setPessoa({ ...pessoa, dataNascimento: e.target.value })
          }
        />
      </div>

      <button className="btn btn-success" onClick={salvar}>
        Salvar
      </button>
    </div>
  );
}
