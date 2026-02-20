using Controle_de_Gastos_Residenciais.Data;
using Controle_de_Gastos_Residenciais.Models;
using Controle_de_Gastos_Residenciais.Models.DTOs;

namespace Controle_de_Gastos_Residenciais.Services
{
    public class CategoriaService
    {
        private readonly AppDbContext _context;

        public CategoriaService(AppDbContext context)
        {
            _context = context;
        }

        public CategoriaRespostaDto Criar(CategoriaCriacaoDto dto)
        {
            //Realizo a validação da Finalidade
            if (dto.Finalidade != "Receita" && dto.Finalidade != "Despesa")
                throw new Exception("Finalidade deve ser 'Receita' ou 'Despesa'");

            var categoria = new Categoria
            {
                Descricao = dto.Descricao,
                Finalidade = dto.Finalidade
            };

            _context.Categorias.Add(categoria);
            _context.SaveChanges();

            return new CategoriaRespostaDto
            {
                Id = categoria.Id,
                Descricao = categoria.Descricao,
                Finalidade = categoria.Finalidade
            };
        }

        public List<CategoriaRespostaDto> Listar()
        {
            //faço a busca de todas as categorias existentes
            return _context.Categorias
                .Select(c => new CategoriaRespostaDto
                {
                    Id = c.Id,
                    Descricao = c.Descricao,
                    Finalidade = c.Finalidade
                })
                .ToList();
        }

        public CategoriaRespostaDto? BuscarPorId(int id)
        {
            //verifico a existencia do ID
            var categoria = _context.Categorias.Find(id);
            if (categoria == null) return null;

            //Retorno a resposta
            return new CategoriaRespostaDto
            {
                Id = categoria.Id,
                Descricao = categoria.Descricao,
                Finalidade = categoria.Finalidade
            };
        }

        public bool Remover(int id)
        {
            //Realizo a busca da categoria pelo Id, caso não encontre retorna false
            var categoria = _context.Categorias.Find(id);
            if (categoria == null) return false;

            _context.Categorias.Remove(categoria);
            _context.SaveChanges();
            return true;
        }
    }
}
