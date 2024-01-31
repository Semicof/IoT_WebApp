import React from 'react';
import "../../styles/SearchAndSort.css"

const Sort = ({ sortOption, setSortOption, sortOrder, setSortOrder, sortableColumns }) => {
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div>
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" value={sortOption} onChange={handleSortChange}>
        {sortableColumns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>

      <label htmlFor="order">Sort order: </label>
      <select id="order" value={sortOrder} onChange={handleOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default Sort;
