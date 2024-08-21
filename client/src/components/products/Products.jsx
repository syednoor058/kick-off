/* eslint-disable react-hooks/rules-of-hooks */
// import React from 'react'
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

export default function products() {
  const { products } = useContext(ProductContext);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    setLatestProducts(products.slice(0, 4));
  }, [products]);

  return (
    <div className="w-full h-full py-20 flex flex-col gap-8 items-center">
      <div className="w-full font-bold uppercase text-center text-4xl">
        Trendy Products
      </div>
      <div className="w-full px-20 grid grid-cols-4 gap-7 justify-center place-items-center">
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
  );
}
