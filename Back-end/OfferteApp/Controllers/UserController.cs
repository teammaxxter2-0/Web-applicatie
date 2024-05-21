using Microsoft.AspNetCore.Mvc;
using OfferteApp.Data;
using OfferteApp.Models;
using OfferteApp.Services;


namespace Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AccountService _userService;

        public UserController(DatabaseContext context)
        {
            _userService = new(context);
        }

        [HttpGet]
        public ActionResult<ICollection<Account>> GetAll()
        {
            return _userService.GetAllAccounts();
        }

        [HttpGet("{id}")]
        public ActionResult<Account> GetById(int id)
        {
            return _userService.GetAccountById(id);
        }

        [HttpPost]
        public ActionResult AddAccount(CreateUserModel newAccount)
        {
            return _userService.AddAccount(newAccount) ? Ok() : BadRequest();
        }

        [HttpPost("login")]
        public ActionResult Login(LoginDto request)
        {
            return _userService.Authenticate(request);
        }
        
        [HttpGet]
        [Route("seed")]
        public ActionResult Seed()
        {
            return _userService.Seed() ? Ok() : StatusCode(500);
        }
    }
}