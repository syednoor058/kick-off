// import React from 'react'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useEffect } from "react";
import { FaBoxArchive } from "react-icons/fa6";
import { ImPieChart } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full h-full">
      <div className="w-full min-h-screen top-0 bg-gray-200 flex flex-col gap-5">
        <div className="w-full flex flex-row justify-between items-center py-3 bg-primaryColor px-10 shadow-lg">
          <div className="flex flex-col">
            <div className="text-xl">Kick-Off</div>
            <div className="text-xs">The Jrsey Galleria</div>
          </div>
          <div className="flex flex-row gap-10">
            <div className="flex justify-center items-center">
              <LocalShippingIcon />
            </div>
            <div className="flex justify-center items-center">
              <EmailIcon />
            </div>
            <div className="w-full flex flex-row gap-2 justify-center items-center">
              <div className="px-5 py-3 text-primaryColor flex justify-center items-center bg-secondaryColor rounded-full">
                R
              </div>
              <div className="w-full flex flex-col">
                <div className="w-full text-nowrap">Rakib Shikdar</div>
                <div>@rakibs59</div>
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
                <span className="text-xl w-7 h-auto">
                  <ImPieChart />
                </span>
                Overview
              </Link>
              <Link
                to="add-category"
                className="flex flex-row gap-2 items-center ps-10 hover:bg-secondaryColor duration-300 py-3"
              >
                <span className="w-7 h-auto">
                  <CategoryIcon />
                </span>
                Categories
              </Link>
              <Link
                to="add-product"
                className="flex flex-row gap-2 items-center ps-10 hover:bg-secondaryColor duration-300 py-3"
              >
                <span className="text-xl w-7 h-auto">
                  <FaBoxArchive />
                </span>
                Products
              </Link>
              <Link
                to="add-admin"
                className="flex flex-row gap-2 items-center ps-10 hover:bg-secondaryColor duration-300 py-3"
              >
                <span className="w-7 h-auto">
                  <AccountCircleIcon />
                </span>
                Admins
              </Link>
              <Link
                to="orders"
                className="flex flex-row gap-2 items-center ps-10 hover:bg-secondaryColor duration-300 py-3"
              >
                <span className="w-7 h-auto">
                  <LocalShippingIcon />
                </span>
                Orders
              </Link>
              <Link
                to="messages"
                className="flex flex-row gap-2 items-center ps-10 hover:bg-secondaryColor duration-300 py-3"
              >
                <span className="w-7 h-auto">
                  <EmailIcon />
                </span>
                Messages
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
