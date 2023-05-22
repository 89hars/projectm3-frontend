import { createContext, useState, useEffect } from "react";
const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async (currentToken) => {
    const response = await fetch("http://localhost:5005/auth/verify", {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    if (response.status === 200) {
      const { user } = await response.json();
      initSessionContext(currentToken, user);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    if (localToken) {
      verifyToken(localToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    }
  }, [token]);

  const initSessionContext = (token, user) => {
    setToken(token);
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken();
    setUser();
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
  };

  return (
    <SessionContext.Provider
      value={{
        initSessionContext,
        token,
        user,
        isLoggedIn,
        isLoading,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContextProvider, SessionContext };
