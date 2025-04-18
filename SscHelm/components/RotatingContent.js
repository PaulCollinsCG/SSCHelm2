import React, { useState, useEffect } from 'react';
import RaceList from "./noviceseriesdata";
import RaceTableSpringSaturday from "./raceTableSpringSaturday";
import NoviceSeries from "./noviceSeries";
import WeatherTable from "./weather"
import Calendar from './Calendar';
import { Image } from 'react-bootstrap';
import SlideShow from './PhotoSlideshow';

const RotatingContent = () => {
  return (
    <div>
      <RotatingElements> 
        {/* https://ssc-helm.co.uk/ */}
        {/* https://ssc-helm.co.uk/ */}
        <SlideShow />
        {/* <RaceTableSpringSaturday apiUrl={'https://ssc-helm.co.uk/RaceData/RaceTop/2025%20Spring%20Saturday'} showCrew={true} showClass={true}/> */}
        {/* <RaceTableSpringSaturday apiUrl={'https://ssc-helm.co.uk/RaceData/RaceTop/Spring%20Sunday%202025'}  showCrew={true} showClass={true}/>
        <RaceTableSpringSaturday apiUrl={'https://ssc-helm.co.uk/RaceData/RaceTop/2025%20Spring%20Personal%20Handicap%20Series'}  showCrew={true} showClass={true}/>
        <RaceTableSpringSaturday apiUrl={'https://ssc-helm.co.uk/RaceData/RaceTop/2025%20Spring%20Personal%20Handicap%20Pursuit%20Series'}  showCrew={true} showClass={true}/>
        <RaceTableSpringSaturday apiUrl={'https://ssc-helm.co.uk/RaceData/RaceTop/2024%20-%202025%20Novice%20Series'}  showCrew={false} showClass={false}/> */}
        {/* <Calendar apiUrl={'https://ssc-helm.co.uk/Calendar'}/> */}
        <WeatherTable />
        {/* <RaceTableSpringSaturday apiUrl={'https://localhost:7052/RaceData/RaceTop/2025%20Spring%20Saturday'} showCrew={true} showClass={true}/> */}
        {/* <RaceTableSpringSaturday apiUrl={'https://ssc-helm.co.uk/RaceData/RaceTop/2025%20Spring%20Saturday'} showCrew={true} showClass={true}/> */}
        </RotatingElements>
    </div>
  );
};

const getDuration = (index) => {
  switch (index) {
    case 0: // Slide Show
      return 25000; // 25 seconds
    case 1: // Weather
      return 5000; // 5 seconds
    default:
      return 15000; // fallback duration (e.g., 15s)
  }
};

const RotatingElements = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getTitle = (index) => {
    switch (index) {
      // case 1:
      //   return "Spring Sunday 2025";
      // case 2:
      //   return "Personal Handicap";
      // case 3:
      //   return "Personal Handicap Pursuit";
      // case 4:
      //   return "Novice Series";
      // case 5:
      //   return "Calendar";
      case 0:
        return "Slide Show";
      case 1:
        return "Weather";
      case 2:
        return "Spring Saturday 2025";
      default:
        return index;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
      );
    }, getDuration(currentIndex));

    return () => clearTimeout(timeout);
  }, [currentIndex, children]);

  return (
    <div className="slideshow-container">
      <div className="flex-container">
        <Image
            className="ssclogo"
            width={120}
            src="/SscLogo.png"
            alt="Shustoke Logo"
            fluid
          />
        {/* <div class="rotatingTitle">{getTitle(currentIndex)}</div> */}
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