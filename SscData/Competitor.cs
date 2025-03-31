using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ssc.Data
{
    public enum CompetitorFleet
    {
        Plus,
        Gold,
        Silver,
        Bronze,
        Novice,
        Unknown
    }

    public class Competitor
    {
        public string Name { get; set; }
        public CompetitorFleet Fleet { get; set; }
    }
}
