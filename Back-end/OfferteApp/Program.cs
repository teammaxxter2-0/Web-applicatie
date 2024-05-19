using System.Text;
using Backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OfferteApp.Data;
using OfferteApp.Models;
using OfferteApp.Services;

namespace OfferteApp;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Tijdelijk authentication uitgezet omdat het nog niet gebruikt wordt.
        builder.Services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(x =>
        {
            var key = Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Token"]);
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };
        });

        builder.Services.AddAuthorization();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddControllers();
        builder.Services.AddScoped<AccountService>();
        builder.Configuration.AddEnvironmentVariables().AddJsonFile(builder.Environment.IsDevelopment()
            ? "appsettings.development.json"
            : "appsettings.json");

        builder.Services.AddDbContext<DatabaseContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

        builder.Services.AddCors(options =>
       {
           options.AddPolicy("AllowSpecificOrigin", builder =>
           {
               builder.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
           });
       });

        var app = builder.Build();



        // Swagger documentatie alleen zichtbaar in development.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors("AllowSpecificOrigin");
        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        var db = new DatabaseContext();
        var filled = db.Set<Account>().FirstOrDefault();

        if (filled == null)
        {
            DBSeeding.Seed();
        }
        app.Run();
    }
}