import React from 'react';

const List = ({ places }) => (
  <div className="list-container">
    <h4>Food & Dining around you</h4>
    <div className="place-list">
      {places.map((place, i) => (
        <div key={i} className="place-item">
          <h2>{place.name}</h2>
          <p>{place.vicinity}</p>
          <p>Rating:{place.rating}</p>
        </div>
      ))}
    </div>
  </div>
      );

      // function Load() {
      //   useEffect(() => {
      //     loadMap();
      //   }, []);

  
//   <div className="list-group">
//   <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
//     The current link item
//   </a>
//   <a href="#" className="list-group-item list-group-item-action">A second link item</a>
//   <a href="#" className="list-group-item list-group-item-action">A third link item</a>
//   <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
//   <a className="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</a>
// </div>




export default List;

