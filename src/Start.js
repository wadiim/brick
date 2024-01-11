import './Start.css';
import { Link } from "react-router-dom";
//import background from "./img/background.jpg";

function Start({ setIsSignIn }) {
  return (
    <div
      className="Start-container"
      //style={{ backgroundImage: `url(${background})` }}
    >
      <div className="Header-container">
        <h1 style={{ fontWeight: 900 }}>Fupload</h1>
      </div>
      <div className="Button-container">
        <Link to="/auth">
          <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => setIsSignIn(true)}>
            Sign In
          </button>
        </Link>
        <Link to="/auth">
          <button
              type="button"
              className="btn btn-primary m-2"
              onClick={() => setIsSignIn(false)}>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Start;
