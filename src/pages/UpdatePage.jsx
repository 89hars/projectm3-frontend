import React from "react";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Navigate } from "react-router-dom";

function UpdatePage() {
  const { isLoggedIn, isLoading } = useContext(SessionContext);
  if (!isLoading && !isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <h1> UpdatePage </h1>
    </div>
  );
}

export default UpdatePage;
