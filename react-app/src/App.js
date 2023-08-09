import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./component/Landingpage"
import Explore from "./component/Explore"
import SignIn from "./component/Signin"
import List from "./component/List"


import ExploreDetail from "./component/Exploredetail"
import CityToLatLngConverter from './component/Geolocation';
import Map from './component/Map';
// import SignUp from "./component/Signup"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/geolocation" element={<CityToLatLngConverter />}></Route>
        <Route path="/exploredetail" element={<ExploreDetail />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="list" element={<List/>}></Route>
        {/* <Route path="/signup" element={<SignUp />}></Route> */}
      </Routes>

    </BrowserRouter>
  );
}

