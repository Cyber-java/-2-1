import React, { useState } from "react";

const Search = () => {
  const [, setValueSearch] = useState("");

  return (
    <div className="input-group rounded">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={(e) => setValueSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
