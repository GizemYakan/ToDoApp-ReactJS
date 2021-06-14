import React from "react";
const Search = ({ onChange }) => (
  <div className="search-box">
    <input type="text" placeholder="Search..." name="search" onChange={(e) => onChange(e)}/>
  </div>
);
 export default Search;