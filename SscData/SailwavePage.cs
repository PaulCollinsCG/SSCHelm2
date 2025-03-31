namespace Ssc.Data
{
    public class SailwavePage
    {
        public string Description { get; set; } = "";
        public List<SailwaveRaceData> Races { get; set; } = new List<SailwaveRaceData>();
    }
}
