// import React from 'react'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../../spinner/Spinner";
import { AuthContext } from "./../../../context/AuthContext";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/user-auth`,
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return <>{ok ? <Outlet /> : <Spinner nav={"/"} />}</>;
}
