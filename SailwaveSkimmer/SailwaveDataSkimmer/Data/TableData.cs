using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace SailwaveDataSkimmer.Data
{
    public class TableData
    {
        public string Title { get; set; }
        public string RaceInfo { get; set; }
        public List<Header> Headers { get; set; } = new List<Header>();
        public List<CellData> CellData { get; set; } = new List<CellData>();

        public int? GetColumnNullableInt(string columnName, int rowIndex)
        {
            try
            {
                string text = GetColumnString(columnName, rowIndex);
                if (string.IsNullOrWhiteSpace(text))
                    return null;
                return int.Parse(text);
            }
            catch
            (Exception)
            {
                Console.WriteLine($"Error parsing integer C{columnName}R{rowIndex} 'text");
                return null;
            }
        }

        public string? GetColumnString(string columnName, int rowIndex)
        {
            var header = Headers.FirstOrDefault(c => c.Title == columnName);
            if (header == null)
                return null;
            var text = CellData.FirstOrDefault(c => c.ColumnIndex == header.ColumnIndex && c.RowIndex == rowIndex)?.Data;
            if (text == "&nbsp;")
                return "";
            return text;
        }

        public string? GetCell(int columnIndex, int rowIndex)
        {
            var cell = CellData.FirstOrDefault(c => c.ColumnIndex == columnIndex);
            if (cell == null)
                return null;
            return CellData.FirstOrDefault(c => c.ColumnIndex == cell.ColumnIndex && c.RowIndex == rowIndex)?.Data;
        }

        public int? GetRaceColumn(int raceNumber)
        {
            return Headers.FirstOrDefault(h => h.Title.StartsWith($"R{raceNumber} "))?.ColumnIndex;
        }

        public int RaceCount
        {
            get
            {
                int raceNumber = 1;
                while(GetRaceColumn(raceNumber) != null)
                {
                    raceNumber++;
                }

                return raceNumber - 1;
            }
        }

        public int MaxRow
        {
            get
            {
                return CellData.Max(c=>c.RowIndex);
            }
        }
        public int MaxColumn
        {
            get
            {
                return CellData.Max(c => c.RowIndex);
            }
        }
    }

    public class Header
    {
        public int ColumnIndex { get; set; }
        public string Title { get; set; } = "";
    }

    public class Column
    {
        public int ColumnIndex { get; set; }
        public string Title { get; set; } = "";
        public List<CellData> Data { get; set; } = new List<CellData>();
    }

    public class CellData
    {
        public int RowIndex { get; set; }
        public int ColumnIndex { get; set; }
        public string Data { get; set; } = "";
    }
}
