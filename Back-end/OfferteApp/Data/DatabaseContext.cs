using Microsoft.EntityFrameworkCore;
using OfferteApp.Models;

namespace OfferteApp.Data;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options) {}

    public DbSet<Quotation> Quotations { get; set; } = null!;
    public DbSet<Option> Options { get; set; } = null!;
}