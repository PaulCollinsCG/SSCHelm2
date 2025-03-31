// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");


string jsonFolder = "JsonData";

var skimmer = new SailwaveDataSkimmer.PageSkimmer(jsonFolder);

new SailwaveDataSkimmer.CreateDiary().Create();


var pages = new List<string>()
{
    //"C:\\Temp\\Sailwave\\Sailwave results for 2025 Spring Personal Handicap Series at Shustoke SC 2025.html",
    //"https://www.sailwave.com/results/shustokesc/2025_Spring_Personalhandicap.htm",
    //"https://www.sailwave.com/results/shustokesc/2024_novice_series.htm",
    //"https://www.sailwave.com/results/shustokesc/2025_Spring_Saturday_overall.htm",
    //"https://www.sailwave.com/results/shustokesc/2025_Spring_Sunday_Overall.htm",
    //"https://www.sailwave.com/results/shustokesc/2025_Spring_Personalhandicap_PursuitSeries.htm",
    //"https://www.sailwave.com/results/shustokesc/2024_Winter_Personalhandicap.htm",
    //"https://www.sailwave.com/results/shustokesc/2025_club_championship.htm",
    //"https://www.sailwave.com/results/shustokesc/2024_novice_series.htm",
    //"https://www.sailwave.com/results/shustokesc/2024_Winter_Sunday_overall.htm",
    //"https://www.sailwave.com/results/shustokesc/2024_Winter_Personalhandicap_PursuitSeries.htm",
};

var task = skimmer.SkimPagesAsync(pages);
task.Wait();

var jsonSkimmer = new SailwaveDataSkimmer.JsonSkimmer();

jsonSkimmer.GetFleetData(jsonFolder, $"{jsonFolder}\\Competitors.json");



