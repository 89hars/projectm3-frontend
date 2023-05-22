import { createContext, useState, useContext } from "react";
const SearchContext = createContext();

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

const useSearch = () => useContext(SearchContext)
export { useSearch, SearchContextProvider };
