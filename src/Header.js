import './Header.css'

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightFromBracket,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Header({ setFilter, email }) {
  const [searchText, setSearchText] = useState("");

  return (
    <header className="navbar navbar-expand-lg bd-navbar sticky-top bg-primary">
      <nav className="container-xxl d-inline-flex justify-content-between">
        <div className="navbar-brand">
          Fupload
        </div>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => { setSearchText(e.target.value); }}
          />
          <button
            className="btn btn-secondary"
            type="button"
            onClick = {() => ( setFilter(() => (e) => e.name.indexOf(searchText) > -1) )}
          >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        <div className="nav-item, d-flex">
          <span
            style={{
              textDecoration: "None",
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: "10px",
              color: "white"
            }}
          >
            { email }
          </span>
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
  );
}

export default Header;
