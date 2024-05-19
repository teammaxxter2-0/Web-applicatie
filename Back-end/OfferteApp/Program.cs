using Microsoft.EntityFrameworkCore;
using OfferteApp.Data;

namespace OfferteApp;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Tijdelijk authentication uitgezet omdat het nog niet gebruikt wordt.
        // builder.Services.AddAuthorization();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddControllers();
        builder.Configuration.AddEnvironmentVariables().AddJsonFile(builder.Environment.IsDevelopment()
            ? "appsettings.development.json"
            : "appsettings.json");

        builder.Services.AddDbContext<DatabaseContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

        var app = builder.Build();

        app.MapControllers();

        // Swagger documentatie alleen zichtbaar in development.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        // Tijdelijk authentication uitgezet omdat het nog niet gebruikt wordt.
        // app.UseAuthorization();

        app.Run();
    }
}