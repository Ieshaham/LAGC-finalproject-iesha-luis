import "../App.css";
// import React, { useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
export default function App() {


 return (
<div className="details">
<nav className='nav'>
      
      <div className='title'>Voyage<span className='hawk'>Hawk</span></div>
      <div className="nav-buttons">
      <button className='explore-button'> <a href="/explore">Explore</a></button>
      <Link to="/">
     <button className='login-button'> <a href="/">Home</a></button>
     </Link>
     </div>
      </nav>


      <div className="orangesquare">
        <div className="whitebox">
      <Link to="/explore">
      <button className="back">Go back</button>
      </Link>
      
      <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://www.drodd.com/images15/vacation7.jpg" class="d-block w-100" alt="" />
    </div>
    <div class="carousel-item">
      <img src="https://blackswanfp.co.uk/wp-content/uploads/2019/06/6-2.jpg" class="d-block w-100" alt=""/>
    </div>
    <div class="carousel-item">
      <img src="https://blackswanfp.co.uk/wp-content/uploads/2019/06/6-2.jpg" class="d-block w-100" alt=""/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div>
      </div>
</div>);
}