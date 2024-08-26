// import React from 'react'
import { useLocation } from "react-router-dom";

export default function Header() {
  let location = useLocation();
  return (
    <div
      className={`${
        location.pathname.includes("/dashboard") ? "hidden" : "visible"
      } w-full h-10 flex justify-center items-center text-xs sm:text-sm md:text-base px-2 text-primaryColor bg-secondaryColor text-center`}
    >
      Limited Time Offer - Up to 50% Off on Selected Items for stock clearence!
    </div>
  );
}
