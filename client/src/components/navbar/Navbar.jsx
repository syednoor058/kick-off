// import React from 'react'
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { FaFacebookF, FaHome } from "react-icons/fa";
import { MdPermContactCalendar } from "react-icons/md";
import { RiInstagramFill, RiShoppingBag4Fill } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
    if (userMenuToggle) {
      setUserMenuToggle(false);
    }
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
          <div className="font-bold text-xl md:text-2xl capitalize">
            Kick-Off
          </div>
          <div className="text-xs">The Jersey Galleria</div>
        </Link>
        <div className="w-[33%] hidden lg:visible lg:flex flex-row gap-10">
          <NavLink to="/" className="flex items-center">
            Home
          </NavLink>
          <NavLink to="/collection" className="flex items-center gap-1">
            Products
          </NavLink>
          <NavLink to="/about-us" className="flex items-center gap-1">
            About
          </NavLink>
          <NavLink to="/contact-us" className="flex items-center gap-1">
            Contact
          </NavLink>
        </div>
        <div className="w-[33%] flex flex-row gap-4 justify-end">
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
          <Link
            to="/favourites"
            className="hidden md:visible md:flex items-center gap-1"
          >
            <span>
              <FavoriteBorderIcon />
            </span>
          </Link>
          <Link
            to="/collection"
            className="hidden md:visible md:flex items-center gap-1"
          >
            <span>
              <SearchIcon />
            </span>
          </Link>
          <div className="flex justify-center items-center">
            {auth.user ? (
              <div className="h-full flex items-center">
                <div
                  className="h-[80%] aspect-square text-primaryColor text-xl lg:text-2xl uppercase font-bold rounded-full bg-accentColor flex justify-center items-center cursor-pointer"
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
                      className="h-screen bg-secondaryColor ps-14 sm:ps-20 md:ps-32 lg:ps-40 pe-7 sm:pe-10 md:pe-16 lg:pe-20 absolute right-0 text-primaryColor pt-16 flex flex-col items-end justify-start gap-5 lg:gap-7 text-base md:text-xl top-[104px]"
                    >
                      <div className="flex flex-row gap-3 items-center">
                        <div className="flex flex-col gap-1 text-end justify-center">
                          <div className="uppercase font-semibold leading-none">
                            {auth.user.name}
                          </div>
                          <div className="text-end text-sm text-gray-500">
                            {auth.user.email.split("@")[0]}
                          </div>
                        </div>
                        <div className="w-12 aspect-square rounded-full flex justify-center items-center bg-gray-200 text-secondaryColor font-bold text-xl">
                          {auth.user.name[0]}
                        </div>
                      </div>
                      <div className="cursor-pointer mt-8">
                        {auth.user.role === 1 ? (
                          <NavLink
                            to="/dashboard"
                            onClick={() => handleUserMenuToggle()}
                          >
                            Dashboard
                          </NavLink>
                        ) : (
                          <NavLink
                            to="/my-order"
                            onClick={() => handleUserMenuToggle()}
                          >
                            My Order
                          </NavLink>
                        )}
                      </div>
                      <div
                        onClick={() => handleLogout()}
                        className="cursor-pointer flex justify-center items-center flex-row gap-2"
                      >
                        {" "}
                        <span className="flex justify-center items-center">
                          <TbLogout2 />
                        </span>
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
            className="lg:hidden flex items-center text-secondaryColor rounded cursor-pointer"
            onClick={() => handleToggle()}
          >
            <MenuSharpIcon fontSize="large" />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ x: "100%", opacity: 1 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
            exit={{ x: "100%", opacity: 1, transition: { duration: 0.5 } }}
            className="h-screen bg-secondaryColor ps-28 sm:ps-20 lg:ps-40 pe-7 sm:pe-10 lg:pe-20 absolute top-0 right-0 text-gray-400 pt-16 flex flex-col items-end justify-start gap-7 text-xl sm:text-lg lg:text-2xl md:text-xl lg:hidden"
          >
            <div
              onClick={() => handleToggle()}
              className="cursor-pointer w-6 aspect-square flex justify-center items-center border rounded-sm"
            >
              <CloseIcon fontSize="inherit" />
            </div>
            <NavLink
              to="/"
              onClick={() => handleToggle()}
              className={({ isActive }) =>
                isActive
                  ? "cursor-pointer flex flex-row gap-3 justify-center items-center text-primaryColor underline underline-offset-[4px]"
                  : "cursor-pointer flex flex-row gap-3 justify-center items-center"
              }
            >
              Home{" "}
              <span>
                <FaHome />
              </span>
            </NavLink>
            <NavLink
              to="/collection"
              onClick={() => handleToggle()}
              className={({ isActive }) =>
                isActive
                  ? "cursor-pointer flex flex-row gap-3 justify-center items-center text-primaryColor underline underline-offset-[4px]"
                  : "cursor-pointer flex flex-row gap-3 justify-center items-center"
              }
            >
              Products{" "}
              <span>
                <RiShoppingBag4Fill />
              </span>
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "cursor-pointer flex flex-row gap-3 justify-center items-center text-primaryColor underline underline-offset-[4px]"
                  : "cursor-pointer flex flex-row gap-3 justify-center items-center"
              }
              onClick={() => handleToggle()}
            >
              About{" "}
              <span>
                <BiSolidMessageAltDetail />
              </span>
            </NavLink>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive
                  ? "cursor-pointer flex flex-row gap-3 justify-center items-center text-primaryColor underline underline-offset-[4px]"
                  : "cursor-pointer flex flex-row gap-3 justify-center items-center"
              }
              onClick={() => handleToggle()}
            >
              Contact{" "}
              <span>
                <MdPermContactCalendar />
              </span>
            </NavLink>
            <div className="flex flex-col gap-3 pt-10">
              <div>Find Us:</div>
              <div className="flex flex-row gap-5 justify-end items-center">
                <Link>
                  <FaFacebookF />
                </Link>
                <Link>
                  <RiInstagramFill />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
