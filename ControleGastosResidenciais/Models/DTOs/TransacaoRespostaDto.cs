namespace Controle_de_Gastos_Residenciais.Models.DTOs
{
    public class TransacaoRespostaDto
    {
        public int Id { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public string Nome { get; set; }

        public string PessoaNome { get; set; }
        public string CategoriaDescricao { get; set; }
        public string CategoriaFinalidade { get; set; }
    }
}
