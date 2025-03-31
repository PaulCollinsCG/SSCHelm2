using Microsoft.AspNetCore.Mvc;
using Ssc.Data;
using System.Net.Security;
using System.Security.Cryptography.Xml;

namespace SscApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RaceData : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;


        [HttpGet(Name = "GetTitles")]
        public IEnumerable<string> GetTitles()
        {
            SscRepository.RaceData raceData = new SscRepository.RaceData();
            return raceData.SailwaveTitles;
        }


        [HttpGet("RaceTop/{title}")]
        public Ssc.Data.RaceOverallTable GetRacePageTop(string title)
        {
            SscRepository.RaceData raceData = new SscRepository.RaceData();
            var page = raceData.GetSailwavePage(title);
            return TranformToTable(page.Description, page.Races.First());
        }

        [HttpGet("RaceSub/{title}/{subtitle}")]
        public Ssc.Data.RaceOverallTable GetRacePageTop(string title, string subTitle)
        {
            SscRepository.RaceData raceData = new SscRepository.RaceData();
            var page = raceData.GetSailwavePage(title);
            return TranformToTable(page.Description, page.Races.FirstOrDefault(r=>r.SubTitle == subTitle));
        }


        private Ssc.Data.RaceOverallTable TranformToTable(string description, Ssc.Data.SailwaveRaceData sailwaveData)
        {
            //Remove all where there is no race for the sailor
            sailwaveData.CompetitorData = sailwaveData.CompetitorData.Where(cd => cd.Rounds.Any(r => !r.IsDnc && !r.IsDuty)).ToList();

            var table = new Ssc.Data.RaceOverallTable();
            table.Title = description;
            table.SubTitle = sailwaveData.SubTitle;
            table.RaceRows = new List<Ssc.Data.RaceDataRow>();  
            foreach(var sailWaveRow in sailwaveData.CompetitorData)
            {
                var row = new Ssc.Data.RaceDataRow();
                row.Class = sailWaveRow.Class;
                row.SailNo = sailWaveRow.SailNo;
                row.HelmName = sailWaveRow.HelmName;
                row.CrewName = sailWaveRow.CrewName;
                row.Total = sailWaveRow.Total;
                row.Rank = sailWaveRow.Rank;
                row.Rounds = new List<Ssc.Data.RoundInfo>();
                foreach (var round in sailWaveRow.Rounds)
                {
                    var roundInfo = new Ssc.Data.RoundInfo();
                    roundInfo.Title = new RoundTitle()
                    {
                        Name = GetTitle(round.RoundTitle),
                        Date = GetDate(round.RoundTitle)
                    };

                    roundInfo.RoundResult = new RoundResult()
                    {
                        IsDnc = round.IsDnc,
                        IsDuty = round.IsDuty,
                        IsRetired = round.IsRetired,
                        Points = round.Points
                    };


                    row.Rounds.Add(roundInfo);
                }
                table.RaceRows.Add(row);
            }

            return table;
        }

        private string GetTitle(string title)
        {
            return SplitTitle(title).title;
        }

        private string GetDate(string title)
        {
            return SplitTitle(title).date;
        }

        private (string title, string date) SplitTitle(string title)
        {
            var split = title.Split(" ");
            return (split[0], split[1]);    
        }   


    }
}
