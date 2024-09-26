import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-tabs">
        <div className="title">Voyage<span className="hawk">Hawk</span>
          <div className="hamburger-icon" onClick={() => setIsNavOpen(!isNavOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
      <ul className={`nav-list ${isNavOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Explore">Explore</Link></li>
        <li><Link to="/List">Build your itinerary</Link></li>
        <li><Link to="/Geolocation">Explore Hotels</Link></li>
        <li><Link to="/Placesearch">Things to do</Link></li>
        {/* Add other navigation links */}
      </ul>
    </nav>
  );
}

export default NavBar;

