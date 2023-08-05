// ImageCarousel.js
import React, { useState, useEffect } from 'react';
import Slider from "./Slider";

const ImageCarousel = () => {
  const [photos, setPhotos] = useState([]);
  

  useEffect(() => {
    // Replace 'https://api.example.com/images' with your actual API endpoint
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=&key=`)
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  return (
    <div>
      <h2>Image Carousel</h2>
      <Slider>
        {photos.map((photo, index) => (
          <div key={index}>
            <img src={photo.url} alt={photo.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
