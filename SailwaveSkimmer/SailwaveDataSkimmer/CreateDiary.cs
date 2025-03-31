using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using Ssc.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SailwaveDataSkimmer
{
    public class CreateDiary
    {
        public void Create()
        {
            Ssc.Data.Calendar calendar = new Ssc.Data.Calendar();
            calendar.CalendarEntries.Add(new Ssc.Data.CalendarEntry
            {
                Date = "2025-04-03",
                Title = "Friday night sailing",
                Description = "This is the first of our Friday night sailing sessions"
            });
            calendar.CalendarEntries.Add(new Ssc.Data.CalendarEntry
            {
                Date = "2025-04-05",
                Title = "Celebration Night Social",
                Description = "Location: Shustoke Sailing Club\r\nTime: 6pm start, food served at 6.30pm\r\nDress code: If you'd like to dress for the occasion we're going for a nautical theme!\r\nFood: Everyone has pre-ordered.."
            });
            calendar.CalendarEntries.Add(new Ssc.Data.CalendarEntry
            {
                Date = "2025-04-13",
                Title = "Laser and Phantom Open",
                Description = "Please note that this event has exclusive use of the resevoir, there will be no club racing. "
            });
            calendar.CalendarEntries.Add(new Ssc.Data.CalendarEntry
            {
                Date = "2025-04-26",
                Title = "Topper (ITCA) Midlands Traveller Open",
                Description = "Please note that this event has exclusive use of the resevoir, there will be no club racing. "
            });
            calendar.CalendarEntries.Add(new Ssc.Data.CalendarEntry
            {
                Date = "2025-05-03",
                Title = "May Open Day",
                Description = "A chance to welcome new sailors to our club. Please let volunteer if you can help. Also remember to encourage family and friends to come try sailing. "
            });

            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.Converters.Add(new StringEnumConverter());
            var jsonText = JsonConvert.SerializeObject(calendar, settings);
            using (var sw = new StreamWriter("ClubCalendar.json", false))
            {
                sw.WriteLine(jsonText);
            }

        }
    }
}
