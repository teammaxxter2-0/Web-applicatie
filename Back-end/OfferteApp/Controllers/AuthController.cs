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
        private readonly DatabaseContext _dataContext = new();
        private readonly IConfiguration _configuration;
        private readonly AccountService _userService;

        public AuthController(IConfiguration configuration, AccountService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<Account>> AddAccount(Account newAccount) => await _userService.AddAccount(newAccount);

        [HttpPost("login")]
        public async Task<ActionResult<Account>> Login(LoginDto request)
        {
            // Implement authentication logic here
            if (_dataContext == null)
            {
                return BadRequest("accountdb is null");
            }
            string encryptedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);
            var correspondingAccount = await _userService.Authenticate(request.Username, request.Password);
            if (correspondingAccount == null)
            {
                return NotFound("Invalid credentials");
            }
            if (correspondingAccount.Username == request.Username && BCrypt.Net.BCrypt.Verify(correspondingAccount.Password, encryptedPassword))
            {
                loginAccount.AccountId = correspondingAccount!.AccountId;
                loginAccount.Token = CreateToken(correspondingAccount);
                return Ok(loginAccount);
            }
            // Example:

            return NotFound("Invalid credentials");
        }

        private string CreateToken(Account account)
        {
            var claims = new ClaimsIdentity(new[] {
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
            //initiate the token handler 
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenJwt = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(tokenJwt);

            return token;
        }

        // private string HashPassword(string password)
        // {
        //     using (SHA256 hash = SHA256.Create())
        //     {
        //         byte[] bytes = hash.ComputeHash(Encoding.UTF8.GetBytes(password));


        //     }
        // }


    }
}