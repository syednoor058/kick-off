// import React from 'react'
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

export default function LatestProducts() {
  const { products } = useContext(ProductContext);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div className="flex flex-col gap-10 md:gap-16">
      <div className="w-full h-full flex flex-col gap-8 items-center">
        <div className="w-full font-bold uppercase text-center text-4xl">
          Latest Products
        </div>
        <div className="w-full px-5 sm:px-10 md:px-16 lg:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 justify-center place-items-center">
          {latestProducts.map((item, index) => (
            <ProductCard
              key={index}
              id={item._id}
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          to="/collection"
          className="text-center border border-gray-400 rounded-sm flex gap-1 justify-center items-center uppercase ps-3"
        >
          Explore our collection
          <span className="flex justify-end items-center">
            <ArrowRightIcon fontSize="large" />
          </span>
        </Link>
      </div>
    </div>
  );
}
