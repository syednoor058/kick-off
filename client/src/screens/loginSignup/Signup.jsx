// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/register`,
        { firstName, lastName, email, password, phone, address }
      );
      if (res.data.success) {
        setIsLoading(false);
        toast.success(res.data.message);
        navigate("/account/login");
      } else {
        setIsLoading(false);
        toast.error(res.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    document.title = "Register a New Account | KICK-OFF";
  }, []);
  return (
    <div className="w-full flex flex-col gap-10 relative">
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center bg-primaryColor bg-opacity-70 absolute">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-secondaryColor animate-spin dark:text-gray-300 fill-secondaryColor"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full text-center text-2xl font-semibold uppercase">
          Create Account
        </div>
        <div className="w-full text-center">
          Please register below to create an account.
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-row gap-5">
          <input
            className="w-full px-3 py-2 rounded-sm outline-none border"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 rounded-sm outline-none border"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          className="w-full px-3 py-2 rounded-sm outline-none border"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 rounded-sm outline-none border"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 rounded-sm outline-none border"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 rounded-sm outline-none border"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full px-3 py-2 flex justify-center items-center bg-secondaryColor text-primaryColor uppercase hover:bg-transparent border border-secondaryColor hover:text-secondaryColor rounded-sm duration-300"
        >
          Signup
        </button>
        <Link className="hover:underline duration-300" to="/account/login">
          Already have an account
        </Link>
      </form>
    </div>
  );
}
