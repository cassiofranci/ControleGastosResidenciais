using System.ComponentModel.DataAnnotations;

namespace Controle_de_Gastos_Residenciais.Models
{
    public class Categoria
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(400)]
        public string Descricao { get; set; }
       
        [Required]
        [MaxLength(20)]
        public string Finalidade { get; set; }
      
        public ICollection<Transacao> Transacoes { get; set; }
    }
}
