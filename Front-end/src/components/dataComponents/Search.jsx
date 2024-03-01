import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import "../../styles/SearchAndSort.css";

function Search({ setSearchTerm, searchResult }) {
  const [inputText, setInputText] = useState("");

  const handleSearch = () => {
    setSearchTerm({ time: inputText });
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="search-container">
      <input type="text" id="search" value={inputText} onChange={handleInputChange} placeholder='Search time here!' />
      <button onClick={handleSearch} className='searchBtn'>
        <FaSearch />
      </button>
      {searchResult === 'noResults' && <p className="no-results-message">There's nothing that fits your search.</p>}
      {searchResult === 'loading' && <p className="loading-message">Loading...</p>}
    </div>
  );
}

export default Search;
