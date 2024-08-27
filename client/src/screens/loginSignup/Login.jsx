// import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        navigate("/");
        toast.success("Login successfull!");

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("kickoffLoginAuth", JSON.stringify(res.data));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full text-center text-2xl font-semibold uppercase">
        Login
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <input
          className="w-full px-3 py-2 rounded-sm outline-none border"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 rounded-sm outline-none border"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full px-3 py-2 flex justify-center items-center bg-secondaryColor text-primaryColor uppercase hover:bg-transparent border border-secondaryColor hover:text-secondaryColor rounded-sm duration-300"
        >
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
