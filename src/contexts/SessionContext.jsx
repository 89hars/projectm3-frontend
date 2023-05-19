import { createContext } from "react";
export const SessionContext = createContext();


const SessionContextProvider = ({children}) => {
  return <SessionContextProvider>{children}</SessionContextProvider>;
};

export default SessionContextProvider