
export interface Pessoa {
    id: number;
    nome: string;
    dataNascimento: string;
}

export interface Categoria {
    id: number;
    descricao: string;
    finalidade: string;
}

export interface Transacao {
    id: number;
    valor: number;
    data: string;
    descricao: string;
    pessoaId: number;
    categoriaId: number;
}
export interface TransacaoRetorno {
    id: number;
    valor: number;
    data: string;
    descricao: string;
    pessoaNome: string;
    categoriaDescricao: string;
    categoriaFinalidade: string;
}
