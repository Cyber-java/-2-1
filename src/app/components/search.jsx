import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ users }) => {
  const [valueSearch, setValueSearch] = useState("");

  const filtredUsersList = () =>
    users.filter((user) => {
      return user.name.toLowerCase().includes(valueSearch.toLowerCase());
    });

  return (
    <>
      <div className="input-group rounded">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={({ target }) => setValueSearch(target.value)}
        />
      </div>
      <div>{filtredUsersList}</div>
    </>
  );
};

Search.propTypes = {
  users: PropTypes.object,
};
export default Search;
