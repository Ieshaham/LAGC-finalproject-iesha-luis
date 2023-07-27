
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./component/Explore"
// import ExploreDetail from "./component/Exploredetail"
// import SignIn from "./component/Signin"
// import SignUp from "./component/Signup"
import Landingpage from "./component/Landingpage"

export default function App() {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          {/* <Route path="/exploredetails" element={<ExploreDetail />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route> */}
        </Routes>
  
    </BrowserRouter>
  );
}

