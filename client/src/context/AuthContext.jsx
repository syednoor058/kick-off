/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
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
  }, []);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
export default AuthContextProvider;
