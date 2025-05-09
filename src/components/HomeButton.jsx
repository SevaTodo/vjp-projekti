import { Link } from "react-router-dom";
import "./HomeButton.css";
import homeIcon from "../images/home.png";  // Import the image

function HomeButton() {
    return ( 

<Link to="/" className="home-page-link">
      <div className="home-icon">
        <img src={homeIcon} alt="Home" className="home-icon-img" />
      </div>
      </Link>

    )}

export default HomeButton;