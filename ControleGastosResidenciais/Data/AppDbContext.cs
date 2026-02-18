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
            modelBuilder.Entity<Pessoa>()
                .Property(p => p.Nome)
                .HasMaxLength(200)
                .IsRequired();

            modelBuilder.Entity<Categoria>()
                .Property(c => c.Descricao)
                .HasMaxLength(400)
                .IsRequired();

            modelBuilder.Entity<Transacao>()
                .Property(t => t.Descricao)
                .HasMaxLength(400)
                .IsRequired();

            modelBuilder.Entity<Pessoa>()
                .HasMany<Transacao>()
                .WithOne(t => t.Pessoa)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
