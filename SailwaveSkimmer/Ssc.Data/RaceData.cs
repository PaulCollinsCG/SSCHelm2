namespace Ssc.Data
{
    public class SailwavePage
    {
        public string Description { get; set; } = "";
        public List<RaceData> Races { get; set; } = new List<RaceData>();
    }

    public class RaceData
    {
        public string SubTitle { get; set; } = "";
        public RaceInfo RaceInfo { get; set; }
        public IList<CompetitorData> CompetitorData { get; set; } = new List<CompetitorData>();
    }

    public class RaceInfo
    {
        public int? Sailed { get; set; }
        public int? Discards { get; set; }
        public int? ToCount { get; set; }
        public string? RatingSystem { get; set; }
        public int? Entries { get; set; }
        public string? ScoringSystem { get; set; }

        public RaceInfo(string pageData)
        {
            ScoringSystem = null;

            var split = pageData.Split(',');
            foreach (var item in split)
            {
                var split2 = item.Split(':');
                if (split2.Length > 1)
                {
                    switch (split2[0].Trim())
                    {
                        case "Sailed":
                            Sailed = int.Parse(split2[1]);
                            break;
                        case "Discards":
                            Discards = int.Parse(split2[1]);
                            break;
                        case "To count":
                            ToCount = int.Parse(split2[1]);
                            break;
                        case "Rating system":
                            RatingSystem = split2[1];
                            break;
                        case "Entries":
                            Entries = int.Parse(split2[1]);
                            break;
                        case "Scoring system":
                            ScoringSystem = split2[1];
                            break;
                    }
                }
            }
        }
    }

    public class CompetitorData
    {
        public string Rank { get; set; }
        public string Class { get; set; }
        public int SailNo { get; set; }
        public string HelmName { get; set; }
        public string CrewName { get; set; }
        public int? PY { get; set; }
        public double? Total { get; set; }
        public double? Nett { get; set; }
        public IList<Round> Rounds { get; set; } = new List<Round>();
    }

    public class Round
    {
        public Round(string cellText)
        {
            //Remove parenthses
            var edit = cellText.Replace("(", "").Replace(")", "");
            var split = edit.Split(' ');
            Points = double.Parse(split[0]);
            if (split.Length > 1)
            {
                switch (split[1])
                {
                    case "DNC":
                        IsDnc = true;
                        break;
                    case "OOD":
                        IsDuty = true;
                        break;
                    case "RET":
                        IsRetired = true;
                        break;
                }
            }
        }
        public double Points { get; set; }

        public bool IsDnc { get; set; } = false;
        public bool IsDuty { get; set; } = false;
        public bool IsRetired { get; set; } = false;
        public string RoundTitle { get; set; }
    }
}
