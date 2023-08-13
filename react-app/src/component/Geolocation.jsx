import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CityToLatLngConverter() {
  const [city, setCity] = useState("");
  const [placesData, setPlacesData] = useState([]);
 
  const backendHostUrl = `${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1`;

 // const itemsPerPage = 10; //Itemps per page on pagination
  //Handeling pagination code
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const getLatLng = async () => {
    console.log("The city is:", city);
    const res = await fetch(`${backendHostUrl}/getCoordinates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city }),
    });
    //console.log("The Latitud is:" ,latitude);
    //console.log("The longitude is:" ,longitude);
    const data = await res.json();
    console.log("The CityData is:", data);
    console.log(data.city);
    //console.log(city);
    const { lat, lng } = data.data.results[0].geometry.location;

    const activityRes = await fetch(`${backendHostUrl}/getActivities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat, lng }),
    });

    const placesData = await activityRes.json();
    setPlacesData(placesData.data.results);

    console.log("The placesData is:", placesData);
  };

  
  function parseUrl(url) {
    // const parsedUrl =
    console.log("In the parse<Url function");
    console.log(url.split("\\"));
    console.log("\\");

    return url;
    return <img src={url} />;
  }
  
  let navigate = useNavigate();
  const goBack = () => {
    let path = `/explore`;
    navigate(path);
  };
  return (
    <div className="form-group2">
      <div className="pagecontent">
      <div name="header">
        <h1>Search by City</h1>
        <p>
          Here you could search by and specific City. Please introduce the city
          you are going to visit or want to search about.
        </p>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
        />

        <button className="btn btn-success" onClick={getLatLng}>
          Search Places
        </button>
       </div>
      <div>
        <button className="btn btn-primary" onClick={goBack}>
          &larr;Go back
        </button>
      </div>


      <div className="placestable">
        <table className="table">
          <thead>
            <tr>
              <th>Place</th>
              <th>Type of Place</th>
              <th>Rating</th>
              <th>Details</th>
              <th>More info</th>
            </tr>
          </thead>
          <tbody>
            {placesData.map((item) => (
              <tr key={item.place_id}>
                <td>
                  {/*<div
                    dangerouslySetInnerHTML={{
                      __html: item.photos[0].html_attributions[0],
                    }}
                  ></div>*/}
                  <div>{item.name}</div>
                  </td>
                  <td>
                  <div>
                    <img src={item.icon} width="20px" height="20px"></img>
                  </div>
                  </td>
                  <td>
                  <div>Rating: {item.rating}</div>
                </td>
                <td>
                  <div>{item.vicinity}</div>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary "
                    data-bs-toggle="button"
                  >
                    <Link className="gobutton"
                      to={`/ExploreDetail?place_id=${item.place_id}`}
                    >
                    Go &rarr;
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
