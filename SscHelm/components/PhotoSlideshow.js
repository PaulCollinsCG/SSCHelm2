import React, { useState, useEffect } from 'react';

const getRandomImagePath = () => {
  const imageNumber = Math.floor(Math.random() * 217) + 1;
  return `/slideshow/Image (${imageNumber}).jpg`;
};

const PhotoSlideshow = () => {
  const [currentImage, setCurrentImage] = useState(getRandomImagePath());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(getRandomImagePath());
    }, 5000); // change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <img
        src={currentImage}
        alt="Slideshow"
        className="slideshow-image"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  );
};

export default PhotoSlideshow;
