namespace Controle_de_Gastos_Residenciais.Models.DTOs
{
    public class TotaisPorCategoriaDto
    {
        public int CategoriaId { get; set; }
        public string CategoriaDescricao { get; set; }
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo { get; set; }
    }
}
