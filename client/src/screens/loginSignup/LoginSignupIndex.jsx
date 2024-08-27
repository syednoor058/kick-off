// import React from 'react'
import { Link } from "react-router-dom";

export default function LoginSignupIndex() {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-2xl font-semibold uppercase text-center">
        Get your favourite sportswear by simply creating an account or login to
        an existing one.
      </div>
      <div className="w-full flex flex-row gap-7 justify-center items-center">
        <Link
          className="w-[40%] bg-secondaryColor text-primaryColor rounded-sm px-3 py-3 flex items-center justify-center hover:bg-transparent hover:text-secondaryColor hover:border border-secondaryColor duration-300"
          to="login"
        >
          Login
        </Link>
        <div>or</div>
        <Link
          className="w-[40%] bg-transparent text-secondaryColor rounded-sm px-3 py-3 flex items-center justify-center hover:bg-secondaryColor hover:text-primaryColor border border-secondaryColor duration-300"
          to="register"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
