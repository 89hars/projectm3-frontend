import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SessionContextProvider } from "./contexts/SessionContext.jsx";
import { SearchContextProvider } from "./contexts/SearchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
