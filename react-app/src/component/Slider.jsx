// Slider.js
import React, { useState, useEffect } from 'react';

const Slider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, );

  return (
    <div className="slider">
      {children[currentIndex]}
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Slider;
