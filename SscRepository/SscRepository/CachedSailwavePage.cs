using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SscRepository
{
    internal class CachedSailwavePage
    {
        public DateTime FileDate {get;set; } = DateTime.MinValue;

        public string FilePath { get; set; }

        public Ssc.Data.SailwavePage SailwavePage { get; set; } = null;

    }
}
