using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OfferteApp.Data;
using OfferteApp.Models;
using OfferteApp.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static LoginModel loginAccount = new();
        private readonly AccountService _userService;
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(DatabaseContext context, AccountService userService, IConfiguration configuration)
        {
            _context = context;
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult AddAccount(Account newAccount)
        {
            var result = _userService.AddAccount(newAccount);
            return Ok(result);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto request)
        {
            if (_context == null)
            {
                return BadRequest("accountdb is null");
            }


            var correspondingAccount = _userService.Authenticate(request.Username, request.Password);

            if (correspondingAccount == null)
            {
                return NotFound("Invalid credentials");
            }

            var hashedPasswordFromDatabase = HashPassword(correspondingAccount.Password);
            Console.WriteLine(hashedPasswordFromDatabase);

            if (correspondingAccount.Username == request.Username && hashedPasswordFromDatabase == request.Password)
            {
                loginAccount.AccountId = correspondingAccount.AccountId;
                loginAccount.Token = CreateToken(correspondingAccount);
                return Ok(loginAccount);
            }

            return NotFound("Invalid credentials");
        }

        private string CreateToken(Account account)
        {
            var claims = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, account.Username),
            });

            var t = _configuration.GetSection("AppSettings:Token").Value!;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(t));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var expiry = DateTime.Now.AddHours(1);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = expiry,
                Issuer = "Blis",
                Audience = "Blis_accounts",
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenJwt = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(tokenJwt);

            return token;
        }
        private string HashPassword(string password)
        {
            // Hash the plaintext password using your preferred hashing algorithm
            using (SHA256 hash = SHA256.Create())
            {
                byte[] bytes = hash.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }
        [HttpGet]
        [Route("seed")]
        public IActionResult Seed()
        {
            return _userService.Seed() ? Ok() : StatusCode(500);
        }
    }
}