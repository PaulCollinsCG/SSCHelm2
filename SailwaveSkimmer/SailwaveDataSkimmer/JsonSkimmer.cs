using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SailwaveDataSkimmer
{
    public class JsonSkimmer
    {
        public void GetFleetData(string jsonFolder, string competitorJsonFile)
        {
            var competitors = new Ssc.Data.CompetitorsAll();
            if(System.IO.File.Exists(competitorJsonFile))
            {
                competitors = LoadJsonFile<Ssc.Data.CompetitorsAll>(competitorJsonFile);
            }

            string[] jsonFiles = Directory.GetFiles(jsonFolder, "*.json");
            foreach (var jsonFile in jsonFiles)
            {
                try
                {
                    var pageData = LoadJsonFile<Ssc.Data.SailwavePage>(jsonFile);
                    foreach( var race in pageData.Races)
                    {
                        foreach(var competitorData in race.CompetitorData)
                        {
                            if (!string.IsNullOrEmpty(competitorData.Fleet))
                            {
                                var fleet = (Ssc.Data.CompetitorFleet)Enum.Parse(typeof(Ssc.Data.CompetitorFleet), competitorData.Fleet, true);
                                 var competitor = competitors.Competitors.FirstOrDefault(c => c.Name == competitorData.HelmName);
                                if (competitor != null)
                                {
                                    competitor.Fleet = fleet;
                                }
                                else
                                {
                                    competitors.Competitors.Add(new Ssc.Data.Competitor
                                    {
                                        Name = competitorData.HelmName,
                                        Fleet = fleet
                                    });
                                }
                            }
                        }
                    }
                }
                catch (JsonException ex)
                {
                    Console.WriteLine($"JSON does not match the class in file {jsonFile}: {ex.Message}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error loading file {jsonFile}: {ex.Message}");
                }
            }

            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.Converters.Add(new StringEnumConverter());
            var jsonText = JsonConvert.SerializeObject(competitors.Competitors.OrderBy(c=>c.Name), settings);
            using (var sw = new StreamWriter(competitorJsonFile, false))
            {
                sw.WriteLine(jsonText);
            }
        }
        public T LoadJsonFile<T>(string filePath)
        {
            string jsonString = File.ReadAllText(filePath);
            return JsonConvert.DeserializeObject<T>(jsonString);
        }

    }
}
