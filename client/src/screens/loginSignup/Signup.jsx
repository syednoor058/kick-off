// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
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
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/register`,
        { firstName, lastName, email, password, phone, address }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/account/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="w-full flex flex-col gap-10">
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
