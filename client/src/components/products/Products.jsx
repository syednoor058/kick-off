/* eslint-disable react-hooks/rules-of-hooks */
// import React from 'react'
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

export default function products() {
  const { products } = useContext(ProductContext);
  const [trendyProducts, setTrendyProducts] = useState([]);
  useEffect(() => {
    setTrendyProducts(products.slice(0, 4));
  }, [products]);

  return (
    <div className="w-full h-full flex flex-col gap-8 items-center">
      <div className="w-full font-bold uppercase text-center text-4xl">
        Trendy Products
      </div>
      <div className="w-full px-5 sm:px-10 md:px-16 lg:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 justify-center place-items-center">
        {trendyProducts.length > 0 ? (
          <>
            {trendyProducts.map((item, index) => (
              <ProductCard
                key={index}
                id={item._id}
                image={item.photo[0]}
                name={item.name}
                price={item.price}
                available={item.isAvailable}
              />
            ))}
          </>
        ) : (
          <div className="w-full p-20 uppercase text-xl text-gray-400 text-center font-medium">
            No product found!
          </div>
        )}
      </div>
    </div>
  );
}
