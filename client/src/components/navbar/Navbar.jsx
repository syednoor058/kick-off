// import React from 'react'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Navbar() {
  return (
    <div className="w-full bg-primaryColor text-secondaryColor px-20 py-3 flex items-center shadow-lg">
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-center font-bold text-2xl">Kick-Off</div>
          <div className="text-center text-xs">The Jersey Galleria</div>
        </div>
        <div className="flex items-center gap-1">
          {" "}
          <span>
            <ArrowDropDownIcon />
          </span>
          Khulna
        </div>
        <div className="flex items-center gap-2">
          <span>
            <SearchIcon />
          </span>
          <input
            className="w-[350px] border-none outline-none bg-gray-100 rounded p-2"
            placeholder="Search products here"
          />
        </div>
        <div className="flex flex-row gap-10 items-center">
          <div className="flex items-center gap-2">
            <span>
              <ShoppingCartIcon />
            </span>
            Cart
          </div>
          <div className="flex items-center gap-2">
            <span>
              <FavoriteBorderIcon />
            </span>
            Wishlist
          </div>
          <div className="flex items-center gap-2">
            <span>
              <PermIdentityIcon />
            </span>
            Sign Up / Login
          </div>
        </div>
      </div>
    </div>
  );
}
