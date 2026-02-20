namespace Controle_de_Gastos_Residenciais.Models.DTOs
{
    public class TotaisPorPessoaDto
    {
        public int PessoaId { get; set; }
        public string PessoaNome { get; set; }
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo { get; set; }
    }
}
