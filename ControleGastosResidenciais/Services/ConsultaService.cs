using Controle_de_Gastos_Residenciais.Data;
using Controle_de_Gastos_Residenciais.Models.DTOs;
using Controle_de_Gastos_Residenciais.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace Controle_de_Gastos_Residenciais.Services
{
    public class ConsultaService : IConsultaService
    {
        private readonly AppDbContext _context;

        public ConsultaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TotaisPorPessoaDto>> ObterTotaisPorPessoa()
        {
            var resultado = await _context.Transacoes
                .GroupBy(t => new { t.Pessoa.Id, t.Pessoa.Nome })
                .Select(g => new TotaisPorPessoaDto
                {
                    PessoaId = g.Key.Id,
                    PessoaNome = g.Key.Nome,
                    TotalReceitas = g
                        .Where(t => t.Categoria.Finalidade == "Receita" || t.Categoria.Finalidade == "Ambas" && t.Valor > 0)
                        .Sum(t => (decimal?)t.Valor) ?? 0,

                    TotalDespesas = g
                        .Where(t => t.Categoria.Finalidade == "Despesa" || t.Categoria.Finalidade == "Ambas" && t.Valor < 0)
                        .Sum(t => (decimal?)t.Valor) ?? 0,

                    Saldo =
                        (g.Where(t => t.Categoria.Finalidade == "Receita" || t.Categoria.Finalidade == "Ambas" && t.Valor > 0)
                            .Sum(t => (decimal?)t.Valor) ?? 0)
                        -
                        (g.Where(t => t.Categoria.Finalidade == "Despesa" || t.Categoria.Finalidade == "Ambas" && t.Valor < 0)
                            .Sum(t => (decimal?)t.Valor) ?? 0)
                })
                .ToListAsync();

            return resultado;
        }
        public async Task<List<TotaisPorCategoriaDto>> ObterTotaisPorCategoria()
        {
            var resultado = await _context.Transacoes
                .GroupBy(t => new { t.Categoria.Id, t.Categoria.Descricao })
                .Select(g => new TotaisPorCategoriaDto
                {
                    CategoriaId = g.Key.Id,
                    CategoriaDescricao = g.Key.Descricao,
                    TotalReceitas = g
                        .Where(t => t.Categoria.Finalidade == "Receita" || t.Categoria.Finalidade == "Ambas" && t.Valor > 0)
                        .Sum(t => (decimal?)t.Valor) ?? 0,

                    TotalDespesas = g
                        .Where(t => t.Categoria.Finalidade == "Despesa" || t.Categoria.Finalidade == "Ambas" && t.Valor < 0)
                        .Sum(t => (decimal?)t.Valor) ?? 0,

                    Saldo =
                        (g.Where(t => t.Categoria.Finalidade == "Receita" || t.Categoria.Finalidade == "Ambas" && t.Valor > 0)
                            .Sum(t => (decimal?)t.Valor) ?? 0)
                        -
                        (g.Where(t => t.Categoria.Finalidade == "Despesa" || t.Categoria.Finalidade == "Ambas" && t.Valor < 0)
                            .Sum(t => (decimal?)t.Valor) ?? 0)
                })
                .ToListAsync();

            return resultado;
        }
    }
}
