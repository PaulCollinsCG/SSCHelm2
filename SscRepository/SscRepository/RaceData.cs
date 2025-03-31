using Newtonsoft.Json;
using System.Net.Http.Json;
using System.Runtime.CompilerServices;

namespace SscRepository
{
    public class RaceData
    {
        private static IList<CachedSailwavePage> CachedSailwavePages { get; set; } = new List<CachedSailwavePage>();
        private static DateTime LastLoadTime = DateTime.MinValue;

        public IEnumerable<string> SailwaveTitles
        {
            get
            {
                LoadData();
                return CachedSailwavePages.Select(x => x.SailwavePage.Description);
            }
        }

        public Ssc.Data.SailwavePage? GetSailwavePage(string title)
        {
            LoadData();
            var page = CachedSailwavePages.FirstOrDefault(x => x.SailwavePage.Description == title)?.SailwavePage;
            return page;
        }   


        private void LoadData()
        {
            if(DateTime.UtcNow - LastLoadTime > TimeSpan.FromMinutes(30))
            {
                var files = GetJsonFiles("JsonData\\RaceData");
                foreach(var file in files)
                {
                    var fileInfo = new FileInfo(file);
                    var cachedSailwavePage = CachedSailwavePages.FirstOrDefault(x => x.FilePath == fileInfo.FullName);
                    if(cachedSailwavePage == null ||  cachedSailwavePage.FileDate < fileInfo.LastWriteTimeUtc)
                    {
                        var pageData = LoadJsonFile<Ssc.Data.SailwavePage>(fileInfo.FullName);
                        if (cachedSailwavePage == null)
                        {
                            CachedSailwavePages.Add( new CachedSailwavePage() { SailwavePage = pageData, FilePath = fileInfo.FullName, FileDate = fileInfo.LastWriteTimeUtc });
                        }
                        else
                        {
                            cachedSailwavePage.FileDate = fileInfo.LastWriteTimeUtc;
                            cachedSailwavePage.SailwavePage = pageData;
                        }
                    }
                }
                LastLoadTime = DateTime.UtcNow;
            }
        }

        public T LoadJsonFile<T>(string filePath)
        {
            string jsonString = File.ReadAllText(filePath);
            return JsonConvert.DeserializeObject<T>(jsonString);
        }

        public string[] GetJsonFiles(string folderPath)
        {
            if (Directory.Exists(folderPath))
            {
                return Directory.GetFiles(folderPath, "*.json");
            }
            else
            {
                Console.WriteLine("Directory does not exist.");
                return Array.Empty<string>();
            }
        }
    }
}
