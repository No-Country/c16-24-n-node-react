/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext([]);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState();
  const [logIn, setLogIn] = useState(false);

  let token = sessionStorage.getItem("token");
  let userApp = sessionStorage.getItem("user");

  useEffect(() => {
    token ? setLogIn(true) : setLogIn(false);
  }, [logIn, token]);

  useEffect(() => {
    userApp ? setUser(userApp) : setLogIn("");
  }, [user, userApp]);
 
  const handlerLogOut = () => {
    sessionStorage.removeItem("token");
    setLogIn(false);
  };
  
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, logIn, setLogIn, handlerLogOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
