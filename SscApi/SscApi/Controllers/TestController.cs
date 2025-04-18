using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace SscApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet("copy-files", Name = "CopyFiles")]
        public string CopyFile()
        {
            try
            {
                try
                {
                    System.IO.File.Copy("Images\\IMG_3333.jpg", "Test1.jpg");
                }
                catch (Exception ex)
                {
                    throw new Exception($"Test1: {ex.Message}");
                }
                try
                {
                    System.IO.File.Copy("Images\\IMG_3333.jpg", "..\\Test2.jpg");
                }
                catch (Exception ex)
                {
                    throw new Exception($"Test2: {ex.Message}");
                }

                try
                {
                    System.IO.File.Copy("Images\\IMG_3333.jpg", "..\\React\\Test3.jpg");
                }
                catch (Exception ex)
                {
                    throw new Exception($"Test3: {ex.Message}");
                }

                try
                {
                    System.IO.File.Copy("Images\\IMG_3333.jpg", "..\\React\\Slideshow\\Test3.jpg");
                }
                catch (Exception ex)
                {
                    throw new Exception($"Test3: {ex.Message}");
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            return "Success";
        }

        [HttpGet("db-test", Name = "DatabaseTest")]
        public string DatabaseTest()
        {
            try
            {
                string myServer = "db1048025705.hosting-data.io";
                string database = "db1048025705";
                string userName = "dbo1048025705";
                string password = "badA$$dwa38tc4J%VVxRZ9#8Zf";

                string connectionString = $"Server={myServer};Database={database};User Id={userName};Password={password};Encrypt=True;TrustServerCertificate=True;";

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    Console.WriteLine("✅ Connection successful");

                    string sql = "SELECT * FROM Test";

                    using (SqlCommand cmd = new SqlCommand(sql, conn))
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            string name = reader.GetString(0);
                            Console.WriteLine("Result: " + name);
                        }
                        else
                        {
                            Console.WriteLine("❌ No data found");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            return "DB Success";
        }
    }
}
