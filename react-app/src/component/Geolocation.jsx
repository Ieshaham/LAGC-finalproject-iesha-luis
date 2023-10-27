import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";
import NavBar from "./NavBar";
// import Footer from "./Footer";

export default function CityToLatLngConverter() {
  const [city, setCity] = useState("");
  const [placesData, setPlacesData] = useState([]);

  const backendHostUrl = `${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1`;

  //Handeling pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  //determinando el size de la lista a hacer render en pagina
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = placesData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

    const data = await res.json();
    console.log("The CityData is:", data);
    console.log(data.city);

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

  let navigate = useNavigate();
  const goBack = () => {
    let path = `/explore`;
    navigate(path);
  };

  return (
    <div className="explore-details-pages">
      <NavBar />
      <div className="form-group2">
        <div className="pagecontent">

          <div name="header">
          <div>
          <button className="Go-back-button-on-geolocation" onClick={goBack}>
              &larr;Go back
            </button>
          </div>
            <h1 className="geo-title">Search by City</h1>
            <p className="geo-subtitle">
              Here you could search by and specific City. Please introduce the
              city you are going to visit or want to search about.
            </p>
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={handleCityChange}
            />

            <button className="search-places" onClick={getLatLng}>
              Search Places
            </button>
          </div>
        

          <div className="placestable">
            <table className="table">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Type of Place</th>
                  <th>Rating</th>
                  {/* <th>Details</th> */}
                  <th>More info</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  // {placesData.map((item) => (
                  <tr key={item.place_id}>
                    <td className="tablename">
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
                      <div>{item.rating}</div>
                    </td>
                    {/* <td>
                  <div>{item.vicinity}</div>
                </td> */}
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary "
                        data-bs-toggle="button"
                      >
                        <Link
                          className="gobutton"
                          to={`/ExploreDetail?place_id=${item.place_id}`}
                        >
                          Go &rarr;
                        </Link>
                      </button>
                      {/* <ScrollToTop/>    */}
                    </td>
                  </tr>
                  // ))}
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            {Array.from({
              length: Math.ceil(placesData.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                className={index + 1 === currentPage ? "active btn btn-secondary" : " btn btn-secondary"}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
