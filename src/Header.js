import React from "react";
import "./Header.css";
import logo from "./assets/weatherFinderLogo.png";

// Creating the Header component
const Header = ({ searchInput, onInputChange, onSearchSubmit }) => {
  return (
    <header>
      <div className="header-content">
        <img src={logo} alt="Weather App Logo" className="logo" />
        <form onSubmit={onSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search for a location"
            value={searchInput}
            onChange={onInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
