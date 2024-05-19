using Microsoft.EntityFrameworkCore;
using OfferteApp.Models;

namespace OfferteApp.Data;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
    public DatabaseContext() { }
    public DbSet<Quotation> Quotations { get; set; } = null!;
    public DbSet<Option> Options { get; set; } = null!;
    public DbSet<Account> Accounts { get; set; } = null!;
    // protected override void OnConfiguring(DbContextOptionsBuilder builder)
    // {
    //     // builder.UseNpgsql(@"Host=localhost:5432;Username=postgres;Password=123;Database=ProjectCTest;Maximum Pool Size=200");
    //     builder.UseNpgsql(@"Host=localhost:5432;Username=postgres;Password=1234;Database=ProjectD_Database;Maximum Pool Size=200;Include Error Detail=true");
    //     builder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Critical);
    // }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>().HasKey(x => x.AccountId);
        modelBuilder.Entity<Option>().HasKey(x => x.Id);
    }

}