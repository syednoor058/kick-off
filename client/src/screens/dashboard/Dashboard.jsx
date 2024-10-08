// import React from 'react'
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PieChartIcon from "@mui/icons-material/PieChart";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import SettingsIcon from "@mui/icons-material/Settings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { useContext, useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("kickoffLoginAuth");
    // navigate("/account/login");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!auth.user) {
      navigate("/account/login");
    }
  }, [auth?.user, navigate]);
  useEffect(() => {
    document.title = "Dashboard | KICK-OFF";
  }, []);
  return (
    <div className="w-full h-full relative">
      <div className="w-full min-h-screen top-0 bg-gray-200 flex flex-col gap-5">
        <div className="w-full flex flex-row justify-between items-center py-3 bg-primaryColor px-5 sm:px-10 md:px-16 lg:px-20 shadow-lg">
          <div className="w-full flex flex-col">
            <div className="text-xl md:text-2xl font-bold capitalize">
              Kick-Off
            </div>
            <div className="text-xs text-gray-500">The Jersey Galleria</div>
          </div>
          <div className="w-full flex flex-row gap-10 justify-end">
            <div className="flex flex-row gap-2 justify-end items-center">
              <div className="h-full w-auto aspect-square text-primaryColor flex justify-center items-center bg-secondaryColor rounded-full text-xl font-bold">
                {auth?.user?.name[0]}
              </div>
              <div className="flex flex-col">
                <div className="text-base md:text-lg uppercase font-semibold leading-none">
                  {auth?.user?.name}
                </div>
                <div className="flex text-xs md:text-sm text-gray-500">
                  {"@" + auth?.user?.email.split("@")[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 px-5 sm:px-10 md:px-16 lg:px-20 text-xs items-center">
          <Link
            to="/"
            className="flex flex-row gap-2 justify-center items-center hover:underline underline-offset-2"
          >
            <span className="mt-[-3px]">
              <HomeIcon fontSize="small" />
            </span>
            Home
          </Link>
          <div className="text-xl flex justify-center items-center">
            <MdOutlineKeyboardArrowRight />
          </div>
          <div>Dashboard</div>
        </div>
        <div className="w-full h-full flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[20%] h-full lg:h-screen rounded-sm bg-accentColor text-primaryColor flex flex-col justify-between">
            <div className="w-full grid grid-cols-1 justify-between text-sm">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row gap-2 items-center bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400 border-t"
                    : "flex flex-row gap-2 items-center  hover:bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400 border-t"
                }
              >
                <div className="w-full flex flex-row gap-5 items-center">
                  <div className="w-[10%] text-xl h-auto">
                    <PieChartIcon />
                  </div>
                  <div className="w-[90%] lg:flex items-center">Overview</div>
                </div>
              </NavLink>
              <NavLink
                to="add-category"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row gap-2 items-center bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                    : "flex flex-row gap-2 items-center  hover:bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                }
              >
                <div className="w-full flex flex-row gap-5 items-center">
                  <div className="w-[10%] text-xl h-auto">
                    <AutoAwesomeMotionIcon />
                  </div>
                  <div className="w-[90%] lg:flex items-center">Categories</div>
                </div>
              </NavLink>
              <NavLink
                to="add-product"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row gap-2 items-center bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                    : "flex flex-row gap-2 items-center  hover:bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                }
              >
                <div className="w-full flex flex-row gap-5 items-center">
                  <div className="w-[10%] text-xl h-auto">
                    <LocalMallIcon />
                  </div>
                  <div className="w-[90%] lg:flex items-center">Products</div>
                </div>
              </NavLink>
              <NavLink
                to="add-admin"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row gap-2 items-center bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                    : "flex flex-row gap-2 items-center  hover:bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                }
              >
                <div className="w-full flex flex-row gap-5 items-center">
                  <div className="w-[10%] text-xl h-auto">
                    <SupervisorAccountIcon />
                  </div>
                  <div className="w-[90%] lg:flex items-center">Admins</div>
                </div>
              </NavLink>
              <NavLink
                to="orders"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row gap-2 items-center bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                    : "flex flex-row gap-2 items-center  hover:bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                }
              >
                <div className="w-full flex flex-row gap-5 items-center">
                  <div className="w-[10%] text-xl h-auto">
                    <RoomServiceIcon />
                  </div>
                  <div className="w-[90%] lg:flex items-center">Orders</div>
                </div>
              </NavLink>
              <NavLink
                to="messages"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row gap-2 items-center bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                    : "flex flex-row gap-2 items-center  hover:bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                }
              >
                <div className="w-full flex flex-row gap-5 items-center">
                  <div className="w-[10%] text-xl h-auto">
                    <ChatIcon />
                  </div>
                  <div className="w-[90%] lg:flex items-center">Messages</div>
                </div>
              </NavLink>
              <NavLink
                to="banners"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row gap-2 items-center bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                    : "flex flex-row gap-2 items-center  hover:bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                }
              >
                <div className="w-full flex flex-row gap-5 items-center">
                  <div className="w-[10%] text-xl h-auto">
                    <ViewCarouselIcon />
                  </div>
                  <div className="w-[90%] lg:flex items-center">Banners</div>
                </div>
              </NavLink>
            </div>
            <div className="w-full flex flex-col justify-between text-sm">
              <NavLink
                to="settings"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-row gap-2 items-center bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400 lg:border-t"
                    : "flex flex-row gap-2 items-center  hover:bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400 lg:border-t"
                }
              >
                <div className="w-full flex flex-row gap-5 items-center">
                  <div className="w-[10%] text-xl h-auto">
                    <SettingsIcon />
                  </div>
                  <div className="w-[90%] lg:flex items-center ">Settings</div>
                </div>
              </NavLink>
              <Link
                to=""
                className="flex flex-row gap-2 items-center  hover:bg-secondaryColor duration-300 py-3 ps-5 lg:ps-10 pe-5 lg:pe-0 border-b border-gray-400"
                onClick={() => handleLogout()}
              >
                <div className="w-full flex flex-row gap-5 items-center">
                  <div className="w-[10%] text-xl h-auto">
                    <TbLogout2 />
                  </div>
                  <div className="w-[90%] lg:flex items-center">Logout</div>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-[80%] h-screen overflow-y-auto bg-primaryColor rounded-sm relative">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
