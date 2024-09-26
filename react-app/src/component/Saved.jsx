// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';
// import Map from './Map';

// export default function Saved() {
//   const [savedLists, setSavedLists] = useState(JSON.parse(localStorage.getItem('savedLists')) || []);
//   const [customNames, setCustomNames] = useState(savedLists.map(() => '')); // Initialize with empty names

//   const navigate = useNavigate();

//   const handleDelete = (index) => {
//     const newItinerary = [...savedLists];
//     newItinerary.splice(index, 1);
//     setSavedLists(newItinerary);
//     setCustomNames((prevNames) => prevNames.filter((_, i) => i !== index));
//     localStorage.setItem('savedLists', JSON.stringify(newItinerary));
//   };

//   const handleCustomNameChange = (index, newName) => {
//     setCustomNames((prevNames) => {
//       const newNames = [...prevNames];
//       newNames[index] = newName;
//       return newNames;
//     });
//   };

//   const goBack = () => {
//     let path = `/explore`; // Adjust the path as needed
//     navigate(path);
//   };

//   return (
//     <div className="container">
//       <div className="w3-col m4 l3">
//         <h1 className="title">Saved Itineraries</h1>
//         <div className="Go-back-button-on-saved" onClick={goBack}>
//           &larr; Go back
//         </div>
//         {savedLists.length > 0 ? (
//           savedLists.map((list, index) => (
//             <div key={index} className="list-container">
//               <h2 className="list-title-on-saved">{customNames[index] || list.location}</h2>
//               {list.places.map((place, placeIndex) => (
//                 <p key={placeIndex} className="list-item">
//                   {place.name}
//                 </p>
//               ))}
//               <button className="delete-button" onClick={() => handleDelete(index)}>
//                 Delete List
//               </button>
//               <Map places={list.places} />
//             </div>
//           ))
//         ) : (
//           <div className="empty-itinerary">
//             <h2>My Itinerary</h2>
//             <p>No items in the itinerary yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Saved() {
  const [savedLists, setSavedLists] = useState(
    JSON.parse(localStorage.getItem('savedLists')) || []
  );
  const [customTitles, setCustomTitles] = useState(savedLists.map(() => '')); // Initialize with empty titles
  const navigate = useNavigate();

  const handleDeletePlace = (listIndex, placeIndex) => {
    const newItinerary = [...savedLists];
    newItinerary[listIndex].places.splice(placeIndex, 1);
    setSavedLists(newItinerary);
    localStorage.setItem('savedLists', JSON.stringify(newItinerary));
  };

  const handleCustomTitleChange = (index, newTitle) => {
    setCustomTitles((prevTitles) => {
      const newTitles = [...prevTitles];
      newTitles[index] = newTitle;
      return newTitles;
    });
  };

  const groupPlacesByArea = (places) => {
    const areaGroups = {};

    places.forEach((place) => {
      const area = place.area; // Replace with the actual property that holds the area information
      if (!areaGroups[area]) {
        areaGroups[area] = [];
      }
      areaGroups[area].push(place);
    });

    return areaGroups;
  };

  const groupedPlaces = groupPlacesByArea(
    savedLists.flatMap((list, listIndex) =>
      list.places.map((place, placeIndex) => ({ ...place, listIndex, placeIndex }))
    )
  );

  const goBack = () => {
    let path = `/explore`; // Adjust the path as needed
    navigate(path);
  };

  return (
    <div className="container">
      <div className="w3-col m4 l3">
        <h1 className="title">Saved Itineraries</h1>
        <div className="Go-back-button-on-saved" onClick={goBack}>
          &larr; Go back
        </div>
        {Object.keys(groupedPlaces).length > 0 ? (
          Object.keys(groupedPlaces).map((area, index) => (
            <div key={index}>
              <h3 className="list-title-on-saved">
                {customTitles[groupedPlaces[area][0].listIndex] || area}
              </h3>
              {groupedPlaces[area].map((place, placeIndex) => (
                <div key={placeIndex} className="list-container">
                  <p className="list-item">
                    {place.name}
                    <button
                      className="delete-place-button"
                      onClick={() =>
                        handleDeletePlace(place.listIndex, place.placeIndex)
                      }
                    >
                      Delete
                    </button>
                  </p>
                </div>
              ))}
              <input
                type="text"
                placeholder="Enter custom title"
                value={customTitles[groupedPlaces[area][0].listIndex] || ''}
                onChange={(e) =>
                  handleCustomTitleChange(
                    groupedPlaces[area][0].listIndex,
                    e.target.value
                  )
                }
              />
            </div>
          ))
        ) : (
          <div className="empty-itinerary">
            <h2>My Itinerary</h2>
            <p>No items in the itinerary yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

