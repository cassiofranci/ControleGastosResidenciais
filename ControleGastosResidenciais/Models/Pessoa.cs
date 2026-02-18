using System.ComponentModel.DataAnnotations;

namespace Controle_de_Gastos_Residenciais.Models
{
    public class Pessoa
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Nome { get; set; }

        [Required]
        public DateTime DataNascimento { get; set; }
        
        public ICollection<Transacao> Transacoes { get; set; }
        //ICollection para relacionamento
    }
}
