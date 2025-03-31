namespace Ssc.Data
{

    public class SailwaveRaceData
    {
        public string SubTitle { get; set; } = "";
        public SailwaveRaceInfo RaceInfo { get; set; }
        public IList<SailwaveCompetitorData> CompetitorData { get; set; } = new List<SailwaveCompetitorData>();
    }
}
