import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const RaceTableSpringSaturday = ({apiUrl, showCrew = true, showClass = true}) => {
  const [data, setData] = useState([]);
  const [roundTitles, setRoundTitles] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTitle(data.title);

        const processedData = data.raceRows.map(row => {
          const rounds = {};
          row.rounds.forEach(round => {
            const title = `${round.title.name} ${round.title.date}`;
            rounds[title] = round.roundResult.points;
          });
          return { ...row, rounds };
        });

        const uniqueRoundTitles = Array.from(
          new Set(processedData.flatMap(row => Object.keys(row.rounds)))
        );

        setData(processedData);
        setRoundTitles(uniqueRoundTitles);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped w-100">
        <thead>
          <tr>
            <th>Rank</th>
            {showClass && <th>Class</th>}
            <th>Helm</th>
            {showCrew && <th>Crew</th>}
            {roundTitles.map(title => (
              <th key={title}>{title}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.rank}</td>
              {showClass && <td>{row.class}</td>}
              <td>{row.helmName}</td>
              {showCrew && <td>{row.crewName}</td>}
              {roundTitles.map(title => (
                <td key={title}>{row.rounds[title] || '-'}</td>
              ))}
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceTableSpringSaturday;