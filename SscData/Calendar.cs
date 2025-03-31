using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ssc.Data
{
    public class Calendar
    {
        public IList<CalendarEntry> CalendarEntries { get; set; } = new List<CalendarEntry>();
    }
}
