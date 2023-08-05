import React from "react";
import "../App.css";
import { Link } from 'react-router-dom';
import  ImageCarousel from "../component/ImageCarousel";



export default function ExploreDetail() {
  return (
    <>
    <div className="details">
      <nav className='nav'>
        <div className='title'>Voyage<span className='hawk'>Hawk</span></div>
        <div className="nav-buttons">
          <button className='explore-button'> <a href="/explore">Explore</a></button>
          <Link to ="/" className='login-button'>
            Home
          </Link>
        </div>
      </nav>
      <div className="orangesquare">
        <div className="whitebox">
          <Link to="/explore" className="back">
         Go back
          </Link>
        </div>
      </div>
    </div>
{/* <ImageCarousel /> */}
</>
  );
}
