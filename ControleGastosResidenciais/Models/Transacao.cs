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

        //Chave estrangeira - pessoa
        public int PessoaId { get; set; }
        public Pessoa Pessoa { get; set; }

        //Chave estrangeira - categoria
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }

    }
}
