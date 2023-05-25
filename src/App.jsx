import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import CreatePage from "./pages/CreatePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import Allproducts from "./pages/AllProducts";
import PrivateRoute from "../middleware/PrivateRoute";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage"
import PrivacyPage from "./pages/PrivacyPage";

function App() {
  /*    const APITestConnection 
  = async () => {
    const response = await fetch('http://localhost:5005/api')
    const parsed = await response.json()
    console.log(parsed)
  } 
*/

  useEffect(() => {
    // APITestConnection()
  }, []);

  // Routes To CRUD, delete  will be handle inside Details
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details/:artObjectId" element={<DetailsPage />} />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreatePage />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />

      <Route path="/allproducts" element={<Allproducts />} />
      <Route path="/searchbar" element={<SearchPage />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  );
}

export default App;
