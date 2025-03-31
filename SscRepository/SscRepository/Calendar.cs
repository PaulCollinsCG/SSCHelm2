using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SscRepository
{
    public class Calendar
    {
        private static Ssc.Data.Calendar CachedData { get; set; } = new Ssc.Data.Calendar();
        private static DateTime LastLoadTime = DateTime.MinValue;

        public Calendar()
        {
        }

        public Ssc.Data.Calendar GetCalendar()
        {
            LoadData();
            return CachedData;
        }

        private void LoadData()
        {
            if (DateTime.UtcNow - LastLoadTime > TimeSpan.FromMinutes(30))
            {
                CachedData = LoadJsonFile<Ssc.Data.Calendar>("JsonData\\Other\\ClubCalendar.json");
                LastLoadTime = DateTime.UtcNow;
            }
        }

        public T LoadJsonFile<T>(string filePath)
        {
            string jsonString = File.ReadAllText(filePath);
            return JsonConvert.DeserializeObject<T>(jsonString);
        }
    }
}
