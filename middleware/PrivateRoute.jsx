import { useContext } from "react";
import { SessionContext } from "../src/contexts/SessionContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(SessionContext);

  if (!isLoading && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return isLoading ? <div>Loading...</div> : <div>{children}</div>;
};

export default PrivateRoute
