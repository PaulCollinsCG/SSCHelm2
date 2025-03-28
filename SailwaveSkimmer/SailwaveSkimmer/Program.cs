// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");

var skimmer = new SailwaveDataSkimmer.PageSkimmer();

var pages = new List<string>()
{
    "https://www.sailwave.com/results/shustokesc/2024_Winter_Saturday_overall.htm",
    "https://www.sailwave.com/results/shustokesc/2024_Winter_Personalhandicap.htm",
    "https://www.sailwave.com/results/shustokesc/2025_club_championship.htm",
    "https://www.sailwave.com/results/shustokesc/2024_novice_series.htm",
    "https://www.sailwave.com/results/shustokesc/2024_Winter_Sunday_overall.htm",
    "https://www.sailwave.com/results/shustokesc/2024_Winter_Personalhandicap_PursuitSeries.htm",
};

var task = skimmer.SkimPagesAsync(pages);
task.Wait();


