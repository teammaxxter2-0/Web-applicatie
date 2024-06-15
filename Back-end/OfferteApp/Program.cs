using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OfferteApp.Data;

namespace OfferteApp;

public class Program
{

    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Configuration.AddEnvironmentVariables().AddJsonFile(builder.Environment.IsDevelopment()
            ? "appsettings.development.json"
            : "appsettings.json");

        builder.Services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(x =>
        {
            var key = Encoding.UTF8.GetBytes(builder.Configuration["Token"] ?? throw new InvalidOperationException());
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

        builder.Services.AddDbContext<DatabaseContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

        builder.Services.AddCors(options =>
       {
           options.AddDefaultPolicy(policyBuilder =>
           {
               policyBuilder.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
           });
       });

        var app = builder.Build();
        
        app.MapControllers();

        // Swagger documentatie alleen zichtbaar in development.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors();
        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.Run();
    }
}
