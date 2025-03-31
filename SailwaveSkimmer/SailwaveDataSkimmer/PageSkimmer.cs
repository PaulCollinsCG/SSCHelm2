using HtmlAgilityPack;
using Newtonsoft.Json;
using SailwaveDataSkimmer.Data;
using Ssc.Data;
using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SailwaveDataSkimmer
{
    public class PageSkimmer
    {
        private readonly HttpClient _httpClient;
        private readonly string _outputFolder;
        public PageSkimmer(string outputFolder)
        {
            _httpClient = new HttpClient();
            _outputFolder = outputFolder;
        }

        public async Task SkimPagesAsync(IEnumerable<string> urls)
        {
            AllSailwaveRaceData allRaceData = new AllSailwaveRaceData();
            foreach (var url in urls)
            {
                allRaceData.RacesData.Add(await SkimPageAsync(url));
            }

            //SaveRaceDataOneFile(allRaceData, @"JsonData\SscRaceData.json");
            SaveRaceDataMultipleFiles(allRaceData, $"{_outputFolder}");

        }

        public async Task<SailwavePage> SkimPageAsync(string url)
        {
            try
            {
                string htmlContent;
                if (url.StartsWith("C:"))
                {
                    using(var sr = new System.IO.StreamReader(url))
                    {
                        htmlContent = sr.ReadToEnd();
                    }
                }
                else
                {
                    htmlContent = await _httpClient.GetStringAsync(url);
                    //new System.IO.StreamWriter($"Temp.html").Write(htmlContent);
                    //var htmlContent = new System.IO.StreamReader($"{description}.txt").ReadToEnd();
                }
                var htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(htmlContent);
                var body = htmlDoc.DocumentNode.ChildNodes.Where(n => n.Name == "body").FirstOrDefault();
                if (body == null)
                    throw new Exception("No body found in html.");
                SailwavePage page = new SailwavePage();
                page.Description = GetTitle(body);
                var tableNodes = GetTableNodes(body);
                string jsonFilePath = $@"JsonData\{MakeValidFileName($"{page.Description}.json")}";
                foreach (var tableNode in tableNodes)
                {
                    var tableData = new Data.TableData();
                    tableData.Title = tableNode.Title;
                    tableData.RaceInfo = tableNode.RaceInfo;
                    GetRowColumnData(tableNode.Node, ref tableData);
                    page.Races.Add(GetRaceData(tableData));
                }
                //filter out races with no data
                page.Races = page.Races.Where(r => r.CompetitorData.Count > 1).ToList();
                return page;
            }
            catch(Exception e)
            {
                throw new Exception($"Error parsing url {url}", e);
            }
        }

        private string MakeValidFileName(string input)
        {
            // Get the system's invalid filename characters
            string invalid = new string(Path.GetInvalidFileNameChars());

            // Add other characters you might want to replace
            invalid += "?"; // Example of adding additional characters

            // Replace invalid characters with an underscore
            foreach (char c in invalid)
            {
                input = input.Replace(c.ToString(), "_");
            }

            // Additional safety checks
            // Trim spaces and dots from the end
            input = input.Trim().TrimEnd('.');

            // Handle empty strings or strings that would become empty
            if (string.IsNullOrWhiteSpace(input))
            {
                return "unnamed";
            }

            // Optionally limit length (Windows max path is 260 chars)
            if (input.Length > 255)
            {
                input = input.Substring(0, 255);
            }

            return input;
        }

        private void SaveRaceDataOneFile(AllSailwaveRaceData data, string filePath)
        {
            var fileInfo = new FileInfo(filePath);
            if (fileInfo.Directory != null && !fileInfo.Directory.Exists)
                fileInfo.Directory.Create();

            var jsonText = JsonConvert.SerializeObject(data);
            using(var sw  = new StreamWriter(filePath, false))
            { 
                sw.WriteLine(jsonText); 
            } 
        }
        private void SaveRaceDataMultipleFiles(AllSailwaveRaceData data, string folder)
        {
            var fileInfo = new FileInfo(folder);
            if (fileInfo.Directory != null && !fileInfo.Directory.Exists)
                fileInfo.Directory.Create();

            foreach(var raceData in data.RacesData)
            {
                string filePath = $"{folder}\\{MakeSafeFileName(raceData.Description)}.json";
                var jsonText = JsonConvert.SerializeObject(raceData);
                using (var sw = new StreamWriter(filePath, false))
                {
                    sw.WriteLine(jsonText);
                }
            }
        }

        private string MakeSafeFileName(string fileName)
        {
            // Remove invalid characters
            string invalidChars = Regex.Escape(new string(Path.GetInvalidFileNameChars()));
            string invalidReStr = string.Format(@"[{0}]+", invalidChars);
            return Regex.Replace(fileName, invalidReStr, "_");
        }

        public SailwaveRaceData GetRaceData(Data.TableData tableData)
        {
            SailwaveRaceData raceData = new SailwaveRaceData();
            raceData.SubTitle = tableData.Title.Replace("&nbsp;", " ");
            raceData.RaceInfo = GetRaceInfo(tableData.RaceInfo);

            int rowCount = tableData.MaxRow;
            int colCount = tableData.MaxColumn;
            int raceCount = tableData.RaceCount;

            for(int row = 1; row <= rowCount; row++)
            {
                SailwaveCompetitorData competitorData = new SailwaveCompetitorData();
                competitorData.Rank = tableData.GetColumnString("Rank", row);
                competitorData.Fleet = tableData.GetColumnString("Fleet", row);
                competitorData.Class = tableData.GetColumnString("Class", row);
                competitorData.HelmName = tableData.GetColumnString("HelmName", row);
                competitorData.CrewName = tableData.GetColumnString("CrewName", row);
                competitorData.PY = tableData.GetColumnNullableInt("PY", row);
                competitorData.SailNo = tableData.GetColumnNullableInt("SailNo", row);
                competitorData.Total = GetDoubleOrNull(tableData.GetColumnString("Total", row));
                competitorData.Nett = GetDoubleOrNull(tableData.GetColumnString("Nett", row));
                for (int race = 1; race <= raceCount; race++)
                {
                    var column = tableData.GetRaceColumn(race).Value;
                    var title = tableData.Headers[column-1].Title;
                    competitorData.Rounds.Add(GetRound(title, tableData.GetCell(column, row)));
                }
                raceData.CompetitorData.Add(competitorData);
            }

            return raceData;
        }

        private SailwaveRound GetRound(string roundTitle, string cellText)
        {
            SailwaveRound round = new SailwaveRound();
            //Remove parenthses
            var edit = cellText.Replace("(", "").Replace(")", "");
            var split = edit.Split(' ');
            round.Points = double.Parse(split[0]);
            if (split.Length > 1)
            {
                switch (split[1])
                {
                    case "DNC":
                        round.IsDnc = true;
                        break;
                    case "OOD":
                        round.IsDuty = true;
                        break;
                    case "RET":
                        round.IsRetired = true;
                        break;
                }
            }

            round.RoundTitle = roundTitle;

            return round;        
        }

        private double? GetDoubleOrNull(string text)
        {
            if(string.IsNullOrWhiteSpace(text)) return null;
            double val;
            if (!double.TryParse(text, out val))
                return null;
            return val;
        }

        public void GetRowColumnData(HtmlNode node, ref Data.TableData tableData)
        {
            if (node.Name == "th")
            {
                var colMatch = Regex.Match(node.XPath, @"th\[(\d+)\]");
                int col = int.Parse(colMatch.Groups[1].Value);
                tableData.Headers.Add(new Header() { ColumnIndex = col, Title = node.InnerText.Trim() });
            }

            if (node.Name == "td")
            {
                var rowMatch = Regex.Match(node.XPath, @"tr\[(\d+)\]");
                var colMatch = Regex.Match(node.XPath, @"td\[(\d+)\]");
                int row = int.Parse(rowMatch.Groups[1].Value);
                int col = int.Parse(colMatch.Groups[1].Value);
                tableData.CellData.Add(new CellData() { RowIndex = row, ColumnIndex = col, Data = node.InnerText.Trim() });
            }

            int count = 0;
            foreach(var child in node.ChildNodes)
            {
                count++;
                GetRowColumnData(child, ref tableData);
            }
        }
        public string GetTitle(HtmlNode body)
        {
            return GetH3Recursive(body);
        }

        public string GetH3Recursive(HtmlNode node)
        {
            if (node.Name == "h3")
                return node.InnerText;

            foreach (var child in node.ChildNodes)
            {
                string title = GetH3Recursive(child);
                if (title != null)
                    return title;
            }

            return null;
        }

        public List<Data.TableNode> GetTableNodes(HtmlNode body)
        {
            var tableNodes = new List<Data.TableNode>();
            string title = string.Empty;
            string scoring = string.Empty;
            GetTableNodesRecursive(body, ref title, ref scoring, ref tableNodes);
            return tableNodes;
        }

        public void GetTableNodesRecursive(HtmlNode node, ref string title, ref string scoring, ref List<Data.TableNode> tableNodes) 
        { 
            if(node.InnerHtml.Contains("Scoring system:") && !node.InnerHtml.Contains("<"))
            {
                scoring = node.InnerHtml;
            }

            if(node.Name == "h3") 
            {
                title = node.InnerText;
            }

            if(node.Name == "table")
            {
                tableNodes.Add(new Data.TableNode() { Title = title, RaceInfo = scoring, Node = node});
            }

            foreach(var child in node.ChildNodes)
            {
                GetTableNodesRecursive(child, ref title, ref scoring, ref tableNodes);
            }
        }

        private SailwaveRaceInfo GetRaceInfo(string pageData)
        {
            SailwaveRaceInfo raceInfo = new SailwaveRaceInfo();
            raceInfo.ScoringSystem = null;

            var split = pageData.Split(',');
            foreach (var item in split)
            {
                var split2 = item.Split(':');
                if (split2.Length > 1)
                {
                    switch (split2[0].Trim())
                    {
                        case "Sailed":
                            raceInfo.Sailed = int.Parse(split2[1]);
                            break;
                        case "Discards":
                            raceInfo.Discards = int.Parse(split2[1]);
                            break;
                        case "To count":
                            raceInfo.ToCount = int.Parse(split2[1]);
                            break;
                        case "Rating system":
                            raceInfo.RatingSystem = split2[1];
                            break;
                        case "Entries":
                            raceInfo.Entries = int.Parse(split2[1]);
                            break;
                        case "Scoring system":
                            raceInfo.ScoringSystem = split2[1];
                            break;
                    }
                }
            }

            return raceInfo;
        }


    }
}
