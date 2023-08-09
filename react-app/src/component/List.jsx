import React from 'react';

const List = ({ places }) => (
  <div className="list-container">
    <h4>Food & Dining around you</h4>
    <div className="place-list">
      {places.map((place, i) => (
        <div key={i} className="place-item">
          <h2>{place.name}</h2>
          <p>{place.vicinity}</p>
          <p>Rating: {place.rating}</p>
        </div>
      ))}
    </div>
  </div>
);

export default List;
