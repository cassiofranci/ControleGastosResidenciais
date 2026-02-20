using Controle_de_Gastos_Residenciais.Models.DTOs;

namespace Controle_de_Gastos_Residenciais.Services.Interface
{
    public interface IConsultaService
    {
        Task<List<TotaisPorPessoaDto>> ObterTotaisPorPessoa();
        Task<List<TotaisPorCategoriaDto>> ObterTotaisPorCategoria();
    }
}
