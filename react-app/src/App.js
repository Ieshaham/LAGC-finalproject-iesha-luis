import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./component/Landingpage"
import Explore from "./component/Explore"
//import SignInG from "./component/Signing"
import SignUP from "./component/Signup"
import List from "./component/List"
//import GoogleSignIn from "./component/GoogleSignIn";
import ContextProvider from "./Context";
import NavBar from "./component/NavBar";



import ExploreDetail from "./component/Exploredetail"
import CityToLatLngConverter from './component/Geolocation';
import Map from './component/Map';


export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
      <NavBar />

      <Routes>
        <Route path="/" element={<Landingpage />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
        {/*<Route path="/signing" element={<sig />}></Route>*/}
        <Route path="/signup" element={<SignUP />}></Route>
        <Route path="/geolocation" element={<CityToLatLngConverter />}></Route>
        <Route path="/exploredetail" element={<ExploreDetail />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="list" element={<List/>}></Route>
        {/*<Route path="googlesignin" element={<GoogleSignIn/>}></Route>*/}
        
      </Routes>
      </ContextProvider>

    </BrowserRouter>
  );
}

