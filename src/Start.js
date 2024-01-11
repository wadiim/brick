import './Start.css';
import { Link } from "react-router-dom";
import logo from "./img/logo.png";

function Start({ setIsSignIn }) {
  return (
    <div className="Start-container">
      <div className="Header-container">
        <img
          src={logo} alt="Logo"
          style={{ maxHeight: '55vh', maxWidth: '55vh', marginBottom: '10%' }}
        />
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
