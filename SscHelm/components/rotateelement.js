import React, { useState, useEffect } from 'react';
import RaceList from "./noviceseriesdata";
import RaceTableSpringSaturday from "./raceTableSpringSaturday";
import NoviceSeries from "./noviceSeries";
import WeatherTable from "./weather"
import Calendar from './Calendar';
import { Image } from 'react-bootstrap';

const RotatingContent = () => {
  return (
    <div>
      <RotatingElements> 
        <RaceTableSpringSaturday apiUrl={'https://localhost:7052/RaceData/RaceTop/2025%20Spring%20Saturday'} showCrew={true} showClass={true}/>
        <RaceTableSpringSaturday apiUrl={'https://localhost:7052/RaceData/RaceTop/Spring%20Sunday%202025'}  showCrew={true} showClass={true}/>
        <RaceTableSpringSaturday apiUrl={'https://localhost:7052/RaceData/RaceTop/2025%20Spring%20Personal%20Handicap%20Series'}  showCrew={true} showClass={true}/>
        <RaceTableSpringSaturday apiUrl={'https://localhost:7052/RaceData/RaceTop/2025%20Spring%20Personal%20Handicap%20Pursuit%20Series'}  showCrew={true} showClass={true}/>
        <RaceTableSpringSaturday apiUrl={'https://localhost:7052/RaceData/RaceTop/2024%20-%202025%20Novice%20Series'}  showCrew={false} showClass={false}/>
        <Calendar apiUrl={'https://localhost:7052/Calendar'}/>
        <WeatherTable />
      </RotatingElements>
    </div>
  );
};

const RotatingElements = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getTitle = (index) => {
    switch (index) {
      case 0:
        return "Spring Saturday 2025";
      case 1:
        return "Spring Sunday 2025";
      case 2:
        return "Personal Handicap";
      case 3:
        return "Personal Handicap Pursuit";
      case 4:
        return "Novice Series";
      case 5:
          return "Calendar";
      case 6:
        return "Weather";
      default:
        return index;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
      );
    }, 60000);

    return () => clearInterval(interval);
  }, [children]);

  return (
    <div>
      <div className="flex-container">
        <Image
            className="ssclogo"
            width={120}
            src="/SscLogo.png"
            alt="Shustoke Logo"
            fluid
          />
        <h1>{getTitle(currentIndex)}</h1>
        <nav>
          {React.Children.map(children, (child, index) => (
            <button
              key={index}
              className={`button ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              {getTitle(index)}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content area */}
      {React.Children.toArray(children)[currentIndex]}
    </div>
  );
};

export default RotatingContent;