using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Controle_de_Gastos_Residenciais.Models
{
    public class Transacao
    {
        public int Id { get; set; }

        [Required]
        public decimal Valor { get; set; }

        [Required]
        public DateTime Data { get; set; }

        [MaxLength(400)]
        public string Descricao { get; set; }

     
        [ForeignKey("Pessoa")]
        public int PessoaId { get; set; }
        public Pessoa Pessoa { get; set; }

     
        [ForeignKey("Categoria")]
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }

    }
}
