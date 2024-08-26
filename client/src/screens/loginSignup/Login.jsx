// import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full text-center text-2xl font-semibold uppercase">
        Login
      </div>
      <form className="w-full flex flex-col gap-5">
        <input
          className="w-full px-3 py-2 rounded-sm outline-none border"
          placeholder="Enter email address"
        />
        <input
          className="w-full px-3 py-2 rounded-sm outline-none border"
          placeholder="Enter password"
        />

        <button className="w-full px-3 py-2 flex justify-center items-center bg-secondaryColor text-primaryColor uppercase hover:bg-transparent border border-secondaryColor hover:text-secondaryColor rounded-sm duration-300">
          Login
        </button>
        <div className="w-full flex flex-row gap-3 justify-between">
          <Link className="hover:underline duration-300">Forget Password?</Link>
          <Link className="hover:underline duration-300" to="/account/register">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
