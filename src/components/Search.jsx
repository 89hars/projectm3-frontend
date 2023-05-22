import React, { useState } from 'react';
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

function Search() {
    const { token, setToken } = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, status } = await fetch(`http://localhost:5005/details/search/${token.keyword}`);
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
                    value={token.keyword}
                    onChange={(e) => setToken({ ...token, keyword: e.target.value })}
                />
                <button className="btn btn-outline-secondary me-5 " type="submit">Search</button>
            </form>
        </div>
    );
}

export default Search;
