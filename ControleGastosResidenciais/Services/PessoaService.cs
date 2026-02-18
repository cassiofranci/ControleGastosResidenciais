using Controle_de_Gastos_Residenciais.Data;
using Controle_de_Gastos_Residenciais.Models;
using Controle_de_Gastos_Residenciais.Models.DTOs;

namespace Controle_de_Gastos_Residenciais.Services
{
    public class PessoaService
    {
        private readonly AppDbContext _context;

        public PessoaService(AppDbContext context)
        {
            _context = context;
        }

        public PessoaRespostaDto Criar(PessoaCriacaoDto dto)
        {
            //Recebo os dados do usuario pelo DTO de criacao e retorno pelo DTO de resposta, para evitar a exposição do Model
            var pessoa = new Pessoa
            {
                Nome = dto.Nome,
                DataNascimento = dto.DataNascimento
            };

            _context.Pessoas.Add(pessoa);
            _context.SaveChanges();

            return new PessoaRespostaDto
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                DataNascimento = pessoa.DataNascimento
            };
        }

        public List<PessoaRespostaDto> Listar()
        {
            //Realiza a listagem de todos as pessoas, retornando a DTO  de resposta
            return _context.Pessoas
                .Select(u => new PessoaRespostaDto
                {
                    Id = u.Id,
                    Nome = u.Nome,
                    DataNascimento = u.DataNascimento
                })
                .ToList();
        }

        public PessoaRespostaDto? BuscarPorId(int id)
        {
            //Verifico se o id existe, se não existir retorno falso, se existir continuo com a busca
            var usuario = _context.Pessoas.Find(id);
            if (usuario == null) return null;

            return new PessoaRespostaDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                DataNascimento = usuario.DataNascimento
            };
        }

        public bool Remover(int id)
        {
            //Verifico se o id existe, se não existir retorno falso, se existir continuo com a exclusão
            var usuario = _context.Pessoas.Find(id);
            if (usuario == null) return false;

            _context.Pessoas.Remove(usuario);
            _context.SaveChanges();
            return true;
        }
    }
}
