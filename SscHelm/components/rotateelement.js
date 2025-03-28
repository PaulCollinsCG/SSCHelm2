import WeatherTable from "./weather";
import RaceList from "./noviceseriesdata";
import React, { useState, useEffect } from 'react';

const RotatingContent = () => {
    return(
      <div>
        <RotatingElements>
            <RaceList/>
            <WeatherTable/>
          </RotatingElements>
      </div>    
      );
}

const RotatingElements = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getTitle = (index) => {
    switch(index)
    {
      case 0:
        return "Race"
      case 1:
        return "Weather"
      default:
        return index
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
    <div className="w-full flex">
      {/* Left side menu */}
      <div className="w-64 min-h-screen bg-gray-100 p-4 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Menu</h2>
        <nav className="space-y-2">
{React.Children.map(children, (child, index) => (
            <button
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {getTitle(index)}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-8">
        <div className="w-full min-h-64 flex items-center justify-center">
          {React.Children.toArray(children)[currentIndex]}
        </div>
      </div>
    </div>
  );
};



export default RotatingContent;