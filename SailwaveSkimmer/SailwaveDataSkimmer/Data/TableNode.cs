using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SailwaveDataSkimmer.Data
{
    public class TableNode
    {
        public string Title { get; set; }
        public string RaceInfo { get; set; }
        public HtmlNode Node { get; set; }
    }
}
