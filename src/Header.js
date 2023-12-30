import React from "react";

// Creating the Header component
const Header = ({ searchInput, onInputChange, onSearchSubmit }) => {
  return (
    <header>
      <h1>Weather App</h1>
      <form onSubmit={onSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a location"
          value={searchInput}
          onChange={onInputChange}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
