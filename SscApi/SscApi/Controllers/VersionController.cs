using Microsoft.AspNetCore.Mvc;

namespace SscApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VersionController : ControllerBase
    {
        [HttpGet(Name = "GetVersion")]
        public string GetVersion()
        {
            return "1.0";
        }



    }
}
