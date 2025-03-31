using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ssc.Data
{
    public class RaceOverallTable
    {
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public IList<RaceDataRow> RaceRows { get; set; }
    }

    public class RaceDataRow
    {
        public string Rank { get; set; }
        public string Class { get; set; }
        public int? SailNo { get; set; }
        public string HelmName { get; set; }
        public string CrewName { get; set; }
        public IList<RoundInfo> Rounds { get; set; } = new List<RoundInfo>();
        public double? Total { get; set; }
    }

    public class RoundInfo
    {
        public RoundTitle Title { get; set; } = new RoundTitle();
        public RoundResult RoundResult { get; set; } = new RoundResult();
    }

    public class RoundTitle
    {
        public string Name { get; set; }
        public string Date { get; set; }
    }

    public class RoundResult
    {
        public double Points { get; set; }
        public bool IsDnc { get; set; } = false;
        public bool IsDuty { get; set; } = false;
        public bool IsRetired { get; set; } = false;
    }
}
