namespace Ssc.Data
{
    public class SailwaveRound
    {
        public SailwaveRound()
        {               
        }
        public double Points { get; set; }

        public bool IsDnc { get; set; } = false;
        public bool IsDuty { get; set; } = false;
        public bool IsRetired { get; set; } = false;
        public string RoundTitle { get; set; }
    }
}
