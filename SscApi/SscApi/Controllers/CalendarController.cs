using Microsoft.AspNetCore.Mvc;
using Ssc.Data;
using System.Net.Security;
using System.Security.Cryptography.Xml;

namespace SscApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalendarController : ControllerBase
    {
        [HttpGet(Name = "GetCalendar")]
        public Ssc.Data.Calendar GetCalendar()
        {
            SscRepository.Calendar calendar = new SscRepository.Calendar();
            var calendarData = calendar.GetCalendar();
            return calendarData;
        }



    }
}
