import React, { useState, useEffect } from 'react';
import "../../styles/SearchAndSort.css"

function Search({ searchTerm, setSearchTerm }) {
  const [inputText, setInputText] = useState(searchTerm);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(inputText);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [inputText, setSearchTerm]);

  const handleSearch = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <input type="text" id="search" value={inputText} onChange={handleSearch} placeholder='Search here!'/>
    </div>
  );
}

export default Search;
