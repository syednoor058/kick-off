// import React from 'react'

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Spinner from "../../spinner/Spinner";

export default function AdminPrivateRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useContext(AuthContext);
  const adminAuthCheck = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/api/v1/auth/admin-auth`,
      {
        headers: {
          Authorization: `${auth?.token}`,
        },
        user: auth.user,
      }
    );
    console.log(auth?.token);
    if (res.data.ok) {
      setOk(true);
    } else {
      setOk(false);
    }
  };
  useEffect(() => {
    adminAuthCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);
  return (
    <>
      {ok ? (
        <Outlet />
      ) : (
        <Spinner nav={"/"} error={true} message="Unauthorized access!" />
      )}
    </>
  );
}
