// import React from 'react'
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import loginSignupImg from "../../assets/images/login_signup.jpg";

export default function LoginSignup() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-screen mt-[104px] flex flex-col-reverse lg:flex-row">
      <div className="w-full lg:w-[50%] top-0 bottom-0 bg-secondaryColor">
        <img
          className="w-full h-full object-cover"
          src={loginSignupImg}
          alt=""
        />
      </div>
      <div className="w-full lg:w-[50%] px-10 lg:px-20 py-10 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
