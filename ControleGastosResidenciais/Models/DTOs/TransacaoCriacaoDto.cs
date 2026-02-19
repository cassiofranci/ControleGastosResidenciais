using System.ComponentModel.DataAnnotations;

namespace Controle_de_Gastos_Residenciais.Models.DTOs
{
    public class TransacaoCriacaoDto
    {
        [Required]
        public decimal Valor { get; set; }
       
        [Required]
        public DateTime Data { get; set; }

        [MaxLength(250)]
        public string Descricao { get; set; }

        [Required]
        public int PessoaId { get; set; }

        [Required]
        public int CategoriaId { get; set; }
    }
}
