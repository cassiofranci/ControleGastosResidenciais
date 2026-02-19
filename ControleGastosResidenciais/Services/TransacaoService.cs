using Controle_de_Gastos_Residenciais.Data;
using Controle_de_Gastos_Residenciais.Models;
using Controle_de_Gastos_Residenciais.Models.DTOs;

namespace Controle_de_Gastos_Residenciais.Services
{
    public class TransacaoService
    {
        private readonly AppDbContext _context;

        public TransacaoService(AppDbContext context)
        {
            _context = context;
        }

        public TransacaoRespostaDto Criar(TransacaoCriacaoDto dto)
        {
            //verifico se o valor da transação é maior ou igual a zero
            if (dto.Valor <= 0)
                throw new Exception("Valor deve ser positivo.");

            //verifico se o usuário existe se não retorno a mensagem de erro
            Pessoa pessoa = _context.Pessoas.Find(dto.PessoaId)
                ?? throw new Exception("Usuário não encontrado.");

            //verifico a categoria da transacao, caso não encontrado retorno o erro
            Categoria categoria = _context.Categorias.Find(dto.CategoriaId)
                ?? throw new Exception("Categoria não encontrada.");

            //Realizar a busca da idade, convertendo de datetime para int
            int idade = CalcularIdade(pessoa.DataNascimento);

            //Validação da idade, para atender a regra que menor de idade não pode cadastrar receita
            if (idade < 18 && categoria.Finalidade == "Receita")
                throw new Exception("Menor de idade não pode cadastrar receita.");

            var transacao = new Transacao
            {
                Valor = dto.Valor,
                Data = dto.Data,
                Descricao = dto.Descricao,
                PessoaId = dto.PessoaId,
                CategoriaId = dto.CategoriaId
            };

            _context.Transacoes.Add(transacao);
            _context.SaveChanges();

            return new TransacaoRespostaDto
            {
                Id = transacao.Id,
                Valor = transacao.Valor,
                Data = transacao.Data,
                Descricao = transacao.Descricao,
                PessoaNome = pessoa.Nome,
                CategoriaDescricao = categoria.Descricao,
                CategoriaFinalidade = categoria.Finalidade
            };
        }

        private int CalcularIdade(DateTime dataNascimento)
        {
            //Convertendo a data para int
            int idade = DateTime.Today.Year - dataNascimento.Year;

            //validacao se a pessoa fez aniversario nesse ano, se não, subtrai um ano
            if (dataNascimento.Date > DateTime.Today.AddYears(-idade))
                idade--;
            return idade;
        }
        public List<TransacaoRespostaDto> Listar()
        {
            //Realiza a listagem de todos as transacoes, retornando a DTO de resposta
            return _context.Transacoes
                .Select(t => new TransacaoRespostaDto
                {
                    Id = t.Id,
                    Valor = t.Valor,
                    Data = t.Data,
                    Descricao = t.Descricao,
                    PessoaNome = t.Descricao,
                    CategoriaDescricao = t.Descricao            
                })
                .ToList();
        }

        public TransacaoRespostaDto? BuscarPorId(int id)
        {
            //Verifico se o id existe, se não existir retorno falso, se existir continuo com a busca
            var transacao = _context.Transacoes.Find(id);
            if (transacao == null) return null;

            return new TransacaoRespostaDto
            {
                Id = transacao.Id,
                Valor = transacao.Valor,
                Data = transacao.Data,
                Descricao = transacao.Descricao,
                PessoaNome = transacao.Descricao,
                CategoriaDescricao = transacao.Descricao          
            };
        }
    }
}
