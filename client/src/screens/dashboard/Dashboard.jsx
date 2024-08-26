// import React from 'react'
import HomeIcon from "@mui/icons-material/Home";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CategoryIcon from "@mui/icons-material/Category";
import EmailIcon from "@mui/icons-material/Email";
import Inventory2SharpIcon from "@mui/icons-material/Inventory2Sharp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useEffect } from "react";
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
          <div>/</div>
          <div>Dashboard</div>
        </div>
        <div className="w-full h-full flex flex-row gap-10">
          <div className="w-[20%] h-screen rounded-sm bg-accentColor text-primaryColor">
            <div className="w-full h-full flex flex-col gap-8 py-20 ps-10">
              <Link to="/dashboard" className="flex flex-row gap-2">
                <span>
                  <AssignmentIcon />
                </span>
                Overview
              </Link>
              <Link to="add-category" className="flex flex-row gap-2">
                <span>
                  <CategoryIcon />
                </span>
                Categories
              </Link>
              <Link to="add-product" className="flex flex-row gap-2">
                <span>
                  <Inventory2SharpIcon />
                </span>
                Products
              </Link>
              <Link to="add-admin" className="flex flex-row gap-2">
                <span>
                  <AccountCircleIcon />
                </span>
                Admins
              </Link>
              <Link to="orders" className="flex flex-row gap-2">
                <span>
                  <LocalShippingIcon />
                </span>
                Orders
              </Link>
              <Link to="messages" className="flex flex-row gap-2">
                <span>
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
