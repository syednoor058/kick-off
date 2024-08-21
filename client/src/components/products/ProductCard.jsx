/* eslint-disable react/prop-types */
// import React from 'react'

import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

export default function ProductCard({ id, image, name, price }) {
  const { currency } = useContext(ProductContext);

  return (
    <Link
      to={`/product/${id}`}
      className="w-full h-full flex flex-col gap-5 rounded overflow-hidden group"
    >
      <div className="w-full h-[320px] shadow-md overflow-hidden">
        <img
          className="w-full h-full object-cover object-center group-hover:scale-[1.1] duration-300"
          src={image}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-2 text-center leading-none">
        <div className="text-lg font-medium leading-5">{name}</div>
        <div>
          Price: {price} {currency}
        </div>
      </div>
    </Link>
  );
}
