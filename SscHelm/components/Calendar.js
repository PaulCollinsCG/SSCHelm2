import React, { useEffect, useState } from 'react';

const Calendar = ({ apiUrl }) => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setEntries(data.calendarEntries || []))
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, [apiUrl]);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Upcoming Events</h1>
      <ul className="calendar-list">
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <li key={index} className="calendar-entry">
              <div className="calendar-date">{entry.date}</div>
              <div className="calendar-details">
                <h2 className="calendar-entry-title">{entry.title}</h2>
                <p className="calendar-entry-description">{entry.description}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="no-entries">No calendar entries available.</p>
        )}
      </ul>
    </div>
  );
};

export default Calendar;