import { createContext, useState, useContext } from "react";
export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
    const [token, setToken] = useState({
        keyword: "",
        results: []
    });



    return (
        <SearchContext.Provider value={{ token, setToken }}>
            {children}
        </SearchContext.Provider>
    );
};


export default SearchContextProvider;
