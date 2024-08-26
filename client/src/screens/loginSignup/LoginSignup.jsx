// import React from 'react'
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function LoginSignup() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-screen mt-[104px] flex flex-row">
      <div className="w-[50%] top-0 bottom-0 bg-secondaryColor">way</div>
      <div className="w-[50%] px-20 py-10 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
