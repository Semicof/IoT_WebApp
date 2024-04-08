import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/SearchAndSort.css";

function Search({
  setSearchTerm,
  searchResult,
  setSearchColumn,
  tableName
}) {
  const [inputText, setInputText] = useState("");

  const handleSearch = () => {
    setSearchTerm(inputText);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTypeSearch = (e)=>{
    setSearchColumn(e.target.value)
  }

  return tableName==="get_sensor_data"?(
    <div className="search-container">
      <input
        type="text"
        id="search"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Search here!"
      />
      <select className="searchColumn" onChange={handleTypeSearch}>
        <option selected value="all">
          All
        </option>
        <option value="id">ID</option>
        <option value="temperature">Temperature</option>
        <option value="humidity">Humidity</option>
        <option value="brightness">Brightness</option>
        <option value="time">Time</option>
      </select>
      <button onClick={handleSearch} className="searchBtn">
        <FaSearch />
      </button>
      {searchResult === "noResults" && (
        <p className="no-results-message">
          There's nothing that fits your search.
        </p>
      )}
      {searchResult === "loading" && (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  ) : (
    <div className="search-container">
      <input
        type="text"
        id="search"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Search here!"
      />
      <select className="searchColumn" onChange={handleTypeSearch}>
        <option selected value="all">
          All
        </option>
        <option value="id">ID</option>
        <option value="device">Device</option>
        <option value="action">Action</option>
        <option value="time">Time</option>
      </select>
      <button onClick={handleSearch} className="searchBtn">
        <FaSearch />
      </button>
      {searchResult === "noResults" && (
        <p className="no-results-message">
          There's nothing that fits your search.
        </p>
      )}
      {searchResult === "loading" && (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  )
}

export default Search;
