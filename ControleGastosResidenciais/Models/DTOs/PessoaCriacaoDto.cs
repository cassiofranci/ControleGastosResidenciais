using System.ComponentModel.DataAnnotations;

namespace Controle_de_Gastos_Residenciais.Models.DTOs
{
    public class PessoaCriacaoDto
    {
        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        [Required]
        public DateTime DataNascimento { get; set; }
        public int? Id { get; set; }
    }
}
