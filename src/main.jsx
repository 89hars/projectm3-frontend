import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SessionContextProvider } from "./contexts/SessionContext.jsx";
import SearchContextProvider from "./contexts/SearchContext.jsx";
import CartContextProvider from "./contexts/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionContextProvider>
        <SearchContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </SearchContextProvider>
      </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
