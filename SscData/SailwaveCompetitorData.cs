namespace Ssc.Data
{
    public class SailwaveCompetitorData
    {
        public string Rank { get; set; }
        public string Fleet { get; set; }
        public string Class { get; set; }
        public int? SailNo { get; set; }
        public string HelmName { get; set; }
        public string CrewName { get; set; }
        public int? PY { get; set; }
        public double? Total { get; set; }
        public double? Nett { get; set; }
        public IList<SailwaveRound> Rounds { get; set; } = new List<SailwaveRound>();
    }
}
