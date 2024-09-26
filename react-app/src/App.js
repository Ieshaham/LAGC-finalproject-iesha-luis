import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./component/Landingpage";
import Explore from "./component/Explore";
import List from "./component/List";
import ContextProvider from "./Context";
import Saved from "./component/Saved";
import Details from './component/Details';
import Map from './component/Map'
import PlaceSearch from './component/Placesearch';


import ExploreDetail from "./component/Exploredetail"
import CityToLatLngConverter from './component/Geolocation';






export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider>

        <Routes>

          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/geolocation" element={<CityToLatLngConverter />}></Route>
          <Route path="/exploredetail" element={<ExploreDetail />}></Route>
          {/* <Route path="/map" element={<Map />}></Route> */}
          <Route path="/list" element={<List />}></Route>
          <Route path="/saved-lists" element={<Saved />} />
          <Route path="/list/:index" element={<List />} />
          <Route path="/itinerary/:listIndex" element={<Details />} />
          <Route path="/map" element={<Map />}></Route>
          <Route path="/placesearch" element={<PlaceSearch />}></Route>
          

        </Routes>

      </ContextProvider>
    </BrowserRouter>
  );
}