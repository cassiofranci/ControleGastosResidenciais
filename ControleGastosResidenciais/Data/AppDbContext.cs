using Controle_de_Gastos_Residenciais.Models;
using Microsoft.EntityFrameworkCore;

namespace Controle_de_Gastos_Residenciais.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Pessoa> Pessoas => Set<Pessoa>();
        public DbSet<Categoria> Categorias => Set<Categoria>();
        public DbSet<Transacao> Transacoes => Set<Transacao>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //configuracoes para a entidade Pessoa, definindo o tamanho e obrigatoriedade do campo nome
            modelBuilder.Entity<Pessoa>()
               .Property(p => p.Nome)
               .HasMaxLength(200)
               .IsRequired();

            //configuracoes para a entidade Categoria, definindo o tamanho e obrigatoriedade do campo descricao
            modelBuilder.Entity<Categoria>()
                .Property(c => c.Descricao)
                .HasMaxLength(400)
                .IsRequired();

            //configuracoes para a entidade Transacao, definindo o tamanho e obrigatoriedade do campo descricao
            modelBuilder.Entity<Transacao>()
                .Property(t => t.Descricao)
                .HasMaxLength(400)
                .IsRequired();
            //configuracoes para a entidade Pessoa, com o relacionamento com a entidade Transacao, definindo a chave estrangeira e a exclusão em cascata
            modelBuilder.Entity<Pessoa>()
                .HasMany(p => p.Transacoes)
                .WithOne(t => t.Pessoa)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
