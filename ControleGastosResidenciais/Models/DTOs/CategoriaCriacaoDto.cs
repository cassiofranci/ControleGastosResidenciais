using System.ComponentModel.DataAnnotations;

namespace Controle_de_Gastos_Residenciais.Models.DTOs
{
    public class CategoriaCriacaoDto
    {
        [Required]
        [MaxLength(100)]
        public string Descricao { get; set; }

        [Required]
        [MaxLength(20)]
        public string Finalidade { get; set; }
    }
}
