// import React from 'react'
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PieChartIcon from "@mui/icons-material/PieChart";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useContext, useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";

export default function Dashboard() {
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full h-full">
      <div className="w-full min-h-screen top-0 bg-gray-200 flex flex-col gap-5">
        <div className="w-full flex flex-row justify-between items-center py-3 bg-primaryColor px-10 shadow-lg">
          <div className="w-full flex flex-col">
            <div className="text-xl font-bold uppercase">Kick-Off</div>
            <div className="text-xs text-gray-500">The Jrsey Galleria</div>
          </div>
          <div className="w-full flex flex-row gap-10 justify-end">
            <div className="flex flex-row gap-2 justify-end items-center">
              <div className="h-full w-auto aspect-square text-primaryColor flex justify-center items-center bg-secondaryColor rounded-full text-xl font-bold">
                {auth.user.name[0]}
              </div>
              <div className="flex flex-col">
                <div className="text-lg uppercase font-semibold leading-none">
                  {auth.user.name}
                </div>
                <div className="flex text-sm text-gray-500">
                  {"@" + auth.user.email.split("@")[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 px-10">
          <Link
            to="/"
            className="flex flex-row gap-2 justify-center items-center"
          >
            <span className="mt-[-3px]">
              <HomeIcon />
            </span>
            Home
          </Link>
          <div className="text-xl flex justify-center items-center">
            <MdOutlineKeyboardArrowRight />
          </div>
          <div>Dashboard</div>
        </div>
        <div className="w-full h-full flex flex-row gap-10">
          <div className="w-[20%] h-screen rounded-sm bg-accentColor text-primaryColor">
            <div className="w-full h-full flex flex-col gap-1 py-10 text-sm">
              <Link
                to="/dashboard"
                className="flex flex-row gap-2 items-center ps-10 hover:bg-secondaryColor duration-300 py-3"
              >
                <div className="w-full flex flex-row gap-5">
                  <div className="w-[10%] text-xl h-auto">
                    <PieChartIcon />
                  </div>
                  <div className="w-[90%] flex items-center">Overview</div>
                </div>
              </Link>
              <Link
                to="add-category"
                className="flex flex-row gap-2 items-center ps-10 hover:bg-secondaryColor duration-300 py-3"
              >
                <div className="w-full flex flex-row gap-5">
                  <div className="w-[10%] text-xl h-auto">
                    <AutoAwesomeMotionIcon />
                  </div>
                  <div className="w-[90%] flex items-center">Categories</div>
                </div>
              </Link>
              <Link
                to="add-product"
                className="flex flex-row gap-2 items-center ps-10 hover:bg-secondaryColor duration-300 py-3"
              >
                <div className="w-full flex flex-row gap-5">
                  <div className="w-[10%] text-xl h-auto">
                    <LocalMallIcon />
                  </div>
                  <div className="w-[90%] flex items-center">Products</div>
                </div>
              </Link>
              <Link
                to="add-admin"
                className="flex flex-row gap-2 items-center ps-10 hover:bg-secondaryColor duration-300 py-3"
              >
                <div className="w-full flex flex-row gap-5">
                  <div className="w-[10%] text-xl h-auto">
                    <SupervisorAccountIcon />
                  </div>
                  <div className="w-[90%] flex items-center">Admins</div>
                </div>
              </Link>
              <Link
                to="orders"
                className="flex flex-row gap-2 items-center ps-10 hover:bg-secondaryColor duration-300 py-3"
              >
                <div className="w-full flex flex-row gap-5">
                  <div className="w-[10%] text-xl h-auto">
                    <RoomServiceIcon />
                  </div>
                  <div className="w-[90%] flex items-center">Orders</div>
                </div>
              </Link>
              <Link
                to="messages"
                className="flex flex-row gap-2 items-center ps-10 hover:bg-secondaryColor duration-300 py-3"
              >
                <div className="w-full flex flex-row gap-5">
                  <div className="w-[10%] text-xl h-auto">
                    <ChatIcon />
                  </div>
                  <div className="w-[90%] flex items-center">Messages</div>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-[80%] h-full bg-primaryColor rounded-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
