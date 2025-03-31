import React, { useEffect, useState } from 'react';

const NoviceSeries = () => {
  const [data, setData] = useState([]);
  const [roundTitles, setRoundTitles] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7052/RaceData/RaceTop/2024%20-%202025%20Novice%20Series')
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
            <th>Helm</th>
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
              <td>{row.helmName}</td>
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

export default NoviceSeries;