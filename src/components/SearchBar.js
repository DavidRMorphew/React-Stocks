import React from 'react';

const SearchBar = props => {
  const {onChange, onOrderTermChange, alphabetically, price} = props
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={alphabetically} onClick={onOrderTermChange}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={price} onClick={onOrderTermChange}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={onChange}>
          <option value="">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
