/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // default axios headers
  axios.defaults.headers.common["Authorization"] = auth?.token;

  const value = { auth, setAuth };

  useEffect(() => {
    const loginData = localStorage.getItem("kickoffLoginAuth");
    if (loginData) {
      const parsedLoginData = JSON.parse(loginData);
      setAuth({
        ...auth,
        user: parsedLoginData.user,
        token: parsedLoginData.token,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
export default AuthContextProvider;
