import React, { useContext, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

function Search() {
  const { token, setToken } = useContext(SearchContext);
  const { search, setSearch } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await fetch(
        `http://localhost:5005/details/search/${token.keyword}`
      );
      setToken({ ...token, results: data });

      if (status === 201) {
        navigate("/searchbar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-outline-secondary ">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
