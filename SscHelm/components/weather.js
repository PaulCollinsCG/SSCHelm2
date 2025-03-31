'use client';

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowDown } from 'lucide-react';

const WeatherTable = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=52.51872&longitude=-1.665282&hourly=temperature_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m&forecast_days=2'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short'
    }).format(date);
  };

  const filterTimeRange = (data) => {
    if (!data?.hourly) return null;
    
    const filteredIndices = data.hourly.time.reduce((acc, time, index) => {
      const hour = new Date(time).getHours();
      if (hour >= 9 && hour <= 18) {
        acc.push(index);
      }
      return acc;
    }, []);

    return {
      ...data,
      hourly: {
        time: filteredIndices.map(i => data.hourly.time[i]),
        temperature_2m: filteredIndices.map(i => data.hourly.temperature_2m[i]),
        wind_speed_10m: filteredIndices.map(i => data.hourly.wind_speed_10m[i]),
        wind_gusts_10m: filteredIndices.map(i => data.hourly.wind_gusts_10m[i]),
        wind_direction_10m: filteredIndices.map(i => data.hourly.wind_direction_10m[i]),
      }
    };
  };

  const groupTimesByDate = (times) => {
    const groups = [];
    let currentDate = '';
    let currentGroup = { date: '', times: [] };
    
    times.forEach((time) => {
      const date = time.split('T')[0];
      if (date !== currentDate) {
        if (currentGroup.times.length > 0) {
          groups.push({ ...currentGroup });
        }
        currentDate = date;
        currentGroup = { 
          date: formatDate(time),
          times: [time]
        };
      } else {
        currentGroup.times.push(time);
      }
    });
    
    if (currentGroup.times.length > 0) {
      groups.push(currentGroup);
    }
    
    return groups;
  };

  const WindDirectionArrow = ({ degrees }) => {
    const adjustedDegrees = degrees + 180;
    return (
      <div style={{ 
        transform: `rotate(${adjustedDegrees}deg)`,
        display: 'inline-flex',
        transition: 'transform 0.2s ease-in-out'
      }}>
        <ArrowDown size={30} className="text-blue-500" />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  const filteredData = filterTimeRange(weatherData);

  if (!filteredData?.hourly?.time) {
    return (
      <div className="p-4 text-gray-500 bg-gray-50 rounded-lg">
        No weather data available
      </div>
    );
  }

  const timeGroups = groupTimesByDate(filteredData.hourly.time);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-center">
          <Image
            src="/ResevoirArielPhoto.jpg"
            alt="Reservoir Aerial View"
            fluid
          />
        </Col>
      </Row>
        <div className="w-full overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th rowSpan="2">
              </th>
              {timeGroups.map((group, groupIndex) => (
                <th 
                  key={group.date} 
                  colSpan={group.times.length} 
                  className={`py-4 px-2 text-center font-semibold text-gray-600 border border-gray-300
                    ${groupIndex !== 0 ? 'border-l-4 border-l-black' : ''}`}
                >
                  {group.date}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50">
              {timeGroups.flatMap((group, groupIndex) => 
                group.times.map((time, timeIndex) => {
                  const isFirstInDay = timeIndex === 0;
                  return (
                    <th 
                      key={time} 
                      className={`py-3 px-2 text-center font-semibold text-gray-600 border border-gray-300 min-w-[60px]
                        ${isFirstInDay && groupIndex !== 0 ? 'border-l-4 border-l-black' : ''}`}
                    >
                      {formatTime(time)}
                    </th>
                  );
                })
              )}
            </tr>
          </thead>
          <tbody>
          <tr>
              <td className="py-1.5 px-3 text-left font-medium text-gray-600 border border-gray-300 sticky left-0 bg-white">
                Wind Direction
              </td>
              {filteredData.hourly.wind_direction_10m.map((direction, index) => {
                const isNewDay = index > 0 && 
                  filteredData.hourly.time[index].split('T')[0] !== 
                  filteredData.hourly.time[index - 1].split('T')[0];
                return (
                  <td 
                    key={index} 
                    className={`py-1.5 px-2 text-center text-gray-800 border border-gray-300
                      ${isNewDay ? 'border-l-4 border-l-black' : ''}`}
                  >
                    <WindDirectionArrow degrees={direction+180} />
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="py-1.5 px-3 text-left font-medium text-gray-600 border border-gray-300 sticky left-0 bg-white">
                Wind Speed Gusts (km/h)
              </td>
              {filteredData.hourly.wind_gusts_10m.map((speed, index) => {
                const isNewDay = index > 0 && 
                  filteredData.hourly.time[index].split('T')[0] !== 
                  filteredData.hourly.time[index - 1].split('T')[0];
                return (
                  <td 
                    key={index} 
                    className={`py-1.5 px-2 text-center text-gray-800 border border-gray-300
                      ${isNewDay ? 'border-l-4 border-l-black' : ''}`}
                  >
                    {speed.toFixed(1)}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="py-1.5 px-3 text-left font-medium text-gray-600 border border-gray-300 sticky left-0 bg-white">
                Wind Speed (km/h)
              </td>
              {filteredData.hourly.wind_speed_10m.map((speed, index) => {
                const isNewDay = index > 0 && 
                  filteredData.hourly.time[index].split('T')[0] !== 
                  filteredData.hourly.time[index - 1].split('T')[0];
                return (
                  <td 
                    key={index} 
                    className={`py-1.5 px-2 text-center text-gray-800 border border-gray-300
                      ${isNewDay ? 'border-l-4 border-l-black' : ''}`}
                  >
                    {speed.toFixed(1)}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="py-1.5 px-3 text-left font-medium text-gray-600 border border-gray-300 sticky left-0 bg-white">
                Temperature (°C)
              </td>
              {filteredData.hourly.temperature_2m.map((temp, index) => {
                const isNewDay = index > 0 && 
                  filteredData.hourly.time[index].split('T')[0] !== 
                  filteredData.hourly.time[index - 1].split('T')[0];
                return (
                  <td 
                    key={index} 
                    className={`py-1.5 px-2 text-center text-gray-800 border border-gray-300
                      ${isNewDay ? 'border-l-4 border-l-black' : ''}`}
                  >
                    {temp.toFixed(1)}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>     
    </Container>
  );
};

export default WeatherTable;