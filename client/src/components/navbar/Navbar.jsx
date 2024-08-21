// import React from 'react'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

export default function Navbar() {
  const { getCartCount } = useContext(ProductContext);
  const [cartNum, setCartNum] = useState();
  useEffect(() => setCartNum(() => getCartCount()), [getCartCount]);
  return (
    <div className="w-full bg-primaryColor text-secondaryColor px-20 py-3 flex items-center shadow-lg">
      <div className="w-full flex flex-row justify-between">
        <Link className="flex flex-col" to="/">
          <div className="text-center font-bold text-2xl">Kick-Off</div>
          <div className="text-center text-xs">The Jersey Galleria</div>
        </Link>

        <div className="flex flex-row gap-10 items-center">
          <Link to="/" className="flex items-center">
            Home
          </Link>
          <Link to="/collection" className="flex items-center gap-1">
            Products
          </Link>
          <div className="flex items-center gap-1">About Us</div>
          <Link to="/cart" className="flex items-center gap-1">
            <span className="relative">
              {cartNum > 0 && (
                <div className="w-[70%] h-[70%] rounded-full bg-red-600 text-primaryColor p-2 absolute -right-1 -top-1 text-[12px] flex justify-center items-center">
                  {cartNum}
                </div>
              )}
              <ShoppingCartOutlinedIcon />
            </span>
            Cart
          </Link>
          <div className="flex items-center gap-1">
            <span>
              <FavoriteBorderIcon />
            </span>
            Wishlist
          </div>
          <div className="flex items-center gap-1">
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
