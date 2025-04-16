import React, { useState, useEffect } from 'react';

const photos = [
  '/slideshow/Image01.jpg',
  '/slideshow/Image02.jpg',
  '/slideshow/Image03.jpg'
];

const PhotoSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change photo every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <img
        src={photos[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="slideshow-image"
      />
      <div className="slideshow-buttons">
        {photos.map((_, index) => (
          <button
            key={index}
            className={`slideshow-button ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoSlideshow;
