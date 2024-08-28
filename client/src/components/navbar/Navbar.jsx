// import React from 'react'
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [userMenuToggle, setUserMenuToggle] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  let location = useLocation();
  const [toggle, setToggle] = useState(false);
  const handleUserMenuToggle = () => {
    setUserMenuToggle(!userMenuToggle);
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("kickoffLoginAuth");
    navigate("/account/login");
  };
  const { getCartCount } = useContext(ProductContext);
  const [cartNum, setCartNum] = useState();
  useEffect(() => setCartNum(() => getCartCount()), [getCartCount]);
  useEffect(() => {
    setUserMenuToggle(false);
  }, [auth]);
  return (
    <div
      className={`${
        location.pathname.includes("/dashboard") ? "hidden" : "visible"
      } w-full h-16 bg-primaryColor text-secondaryColor px-5 sm:px-10 md:px-16 lg:px-20 flex items-center shadow-lg`}
    >
      <div className="w-full flex flex-row justify-between">
        <Link className="w-[33%] flex flex-col" to="/">
          <div className="font-bold text-xl md:text-2xl">Kick-Off</div>
          <div className="text-xs">The Jersey Galleria</div>
        </Link>
        <div className="w-[33%] hidden lg:visible lg:flex flex-row gap-10">
          <Link to="/" className="flex items-center">
            Home
          </Link>
          <Link to="/collection" className="flex items-center gap-1">
            Products
          </Link>
          <div className="flex items-center gap-1">About</div>
          <div className="flex items-center gap-1">Contact</div>
        </div>
        <div className="w-[33%] flex flex-row gap-5 justify-end">
          <Link to="/cart" className="flex items-center gap-1">
            <span className="relative">
              {cartNum > 0 && (
                <div className="w-[70%] h-[70%] rounded-full bg-red-600 text-primaryColor p-2 absolute -right-1 -top-1 text-[12px] flex justify-center items-center">
                  {cartNum}
                </div>
              )}
              <ShoppingCartOutlinedIcon />
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <span>
              <FavoriteBorderIcon />
            </span>
          </div>
          <Link to="/collection" className="flex items-center gap-1">
            <span>
              <SearchIcon />
            </span>
          </Link>
          <div className="flex justify-center items-center">
            {auth.user ? (
              <div className="h-full">
                <div
                  className="h-full aspect-square text-primaryColor text-2xl uppercase font-bold rounded-full bg-accentColor flex justify-center items-center cursor-pointer"
                  onClick={() => handleUserMenuToggle()}
                >
                  {auth.user.name[0]}
                </div>
                <AnimatePresence>
                  {userMenuToggle && (
                    <motion.div
                      initial={{ x: "100%", opacity: 1 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        transition: { duration: 0.5 },
                      }}
                      exit={{
                        x: "100%",
                        opacity: 1,
                        transition: { duration: 0.5 },
                      }}
                      className="w-[35%] h-screen bg-secondaryColor px-5 sm:px-10 md:px-16 lg:px-20 absolute right-0 text-primaryColor pt-16 flex flex-col items-end justify-start gap-7 text-xl top-[104px]"
                    >
                      <div to="" className="cursor-pointer">
                        {auth.user.role === 1 ? (
                          <Link
                            to="/dashboard"
                            onClick={() => handleUserMenuToggle()}
                          >
                            Dashboard
                          </Link>
                        ) : (
                          <Link
                            to="/my-order"
                            onClick={() => handleUserMenuToggle()}
                          >
                            My Order
                          </Link>
                        )}
                      </div>
                      <div
                        onClick={() => handleLogout()}
                        className="cursor-pointer"
                      >
                        Logout
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/account" className="flex items-center gap-1">
                <PermIdentityIcon />
              </Link>
            )}
          </div>
          <div
            className="lg:hidden flex items-center px-3 bg-secondaryColor text-primaryColor rounded cursor-pointer"
            onClick={() => handleToggle()}
          >
            <MenuSharpIcon fontSize="medium" />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ x: "100%", opacity: 1 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
            exit={{ x: "100%", opacity: 1, transition: { duration: 0.5 } }}
            className="w-[50%] h-screen bg-secondaryColor absolute top-0 right-0 text-primaryColor pt-16 flex flex-col items-center justify-start gap-7 text-2xl md:text-4xl"
          >
            <div onClick={() => handleToggle()} className="cursor-pointer">
              <CloseIcon fontSize="large" />
            </div>
            <Link
              to="/"
              onClick={() => handleToggle()}
              className="cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/collection"
              onClick={() => handleToggle()}
              className="cursor-pointer"
            >
              Products
            </Link>
            <div className="cursor-pointer">About</div>
            <div className="cursor-pointer">Contact</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
