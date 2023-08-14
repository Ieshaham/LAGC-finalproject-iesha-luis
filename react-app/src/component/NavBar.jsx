import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="nav">
      <div className="title">
        Voyage<span className="hawk">Hawk</span>
      </div>

      <Link to="/">
        <button className="login-button">Home</button>
      </Link>
    </nav>
  );
}

export default NavBar;
