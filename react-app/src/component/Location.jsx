
import { useParams } from 'react-router-dom';
import React from 'react';

export default function Location() {

  const { location } = useParams(); // Get the value of the :location parameter

  return (
    <div>
      <h1>{location}</h1>
      {/* Render other content related to the location */}
    </div>
  );
}
