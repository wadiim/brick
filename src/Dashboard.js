import './Dashboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightFromBracket,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <header className="navbar navbar-expand-lg bd-navbar sticky-top bg-primary">
        <nav className="container-xxl d-inline-flex justify-content-between">
          <div className="navbar-brand">
            Brick
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-secondary"
              type="button">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
          <div className="nav-item">
            <Link to="/">
              <button
                type="button"
                className="nav-link m-2">
                  <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Dashboard;
