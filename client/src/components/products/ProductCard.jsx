/* eslint-disable react/prop-types */
// import React from 'react'

import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

export default function ProductCard({ id, image, name, price, available }) {
  const { currency, getRelatedProducts } = useContext(ProductContext);

  return (
    <Link
      to={`/product/${id}`}
      onClick={() => getRelatedProducts(name)}
      className="w-full h-full flex flex-col gap-5 rounded overflow-hidden group"
    >
      <div className="w-full aspect-square shadow-md overflow-hidden relative">
        {available == 1 ? (
          <div className="w-full h-full absolute z-[200] top-5">
            <div className="inline-block px-2 py-2 rounded-sm text-xs uppercase font-medium bg-secondaryColor text-primaryColor">
              In Stock
            </div>
          </div>
        ) : (
          <div className="w-full h-full absolute z-[200] top-0 bottom-0 bg-secondaryColor bg-opacity-70">
            <div className="inline-block px-2 py-2 rounded-sm text-xs uppercase font-medium bg-primaryColor text-secondaryColor mt-5">
              Stock Out
            </div>
          </div>
        )}
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
